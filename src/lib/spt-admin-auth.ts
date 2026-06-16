import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { UserRole } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const cookieName = "spt_admin_session";
const maxAgeSeconds = 60 * 60 * 8;

type SessionPayload = {
  userId: string;
  email: string;
  role: string;
  exp: number;
};

function getSecret() {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is required for admin authentication.");
  }
  return secret;
}

function base64Url(input: string) {
  return Buffer.from(input).toString("base64url");
}

function signPayload(payload: string) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

function getBootstrapAdminConfig() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) return null;

  return {
    email,
    password,
    name: "Super Admin"
  };
}

export function createAdminToken(payload: Omit<SessionPayload, "exp">) {
  const body = base64Url(
    JSON.stringify({
      ...payload,
      exp: Math.floor(Date.now() / 1000) + maxAgeSeconds
    })
  );
  return `${body}.${signPayload(body)}`;
}

export function verifyAdminToken(token?: string): SessionPayload | null {
  if (!token || !token.includes(".")) return null;

  const [body, signature] = token.split(".");
  const expected = signPayload(body);
  if (signature.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function ensureBootstrapAdmin(candidateEmail?: string) {
  const config = getBootstrapAdminConfig();
  if (!config) return;
  if (candidateEmail && candidateEmail.toLowerCase().trim() !== config.email) return;

  const passwordHash = await bcrypt.hash(config.password, 12);

  await prisma.user.upsert({
    where: { email: config.email },
    update: {
      name: config.name,
      passwordHash,
      role: UserRole.SUPER_ADMIN
    },
    create: {
      name: config.name,
      email: config.email,
      passwordHash,
      role: UserRole.SUPER_ADMIN
    }
  });
}

export async function authenticateAdmin(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;

  return user;
}

export async function getAdminSession() {
  const store = await cookies();
  return verifyAdminToken(store.get(cookieName)?.value);
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/spt/admin/login");
  return session;
}

export async function setAdminSession(token: string) {
  const store = await cookies();
  store.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(cookieName);
}
