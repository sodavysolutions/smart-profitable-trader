import Image from "next/image";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/spt/admin-login-form";
import { getAdminSession } from "@/lib/spt-admin-auth";

export const dynamic = "force-dynamic";

export default async function SPTAdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect("/spt/admin/dashboard");

  return (
    <main className="grid min-h-screen place-items-center bg-navy-950 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-5 inline-flex rounded-md bg-white px-3 py-2">
          <Image src="/brand/spt-logo.png" alt="Smart Profitable Trader logo" width={190} height={80} className="h-14 w-auto object-contain" />
        </div>
        <AdminLoginForm />
      </div>
    </main>
  );
}
