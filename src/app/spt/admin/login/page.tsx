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
        <div className="mb-5 inline-flex rounded-xl bg-white p-3 shadow-sm">
          <Image src="/images/smart-profits-trader-logo.png" alt="Smart Profits Trader logo" width={160} height={160} className="h-16 w-16 object-contain" />
        </div>
        <AdminLoginForm />
      </div>
    </main>
  );
}
