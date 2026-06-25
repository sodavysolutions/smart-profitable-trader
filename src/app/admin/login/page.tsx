import { Brand } from "@/components/Brand";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-navy-950 px-4">
      <form className="w-full max-w-md rounded-md bg-white p-6 shadow-soft">
        <div className="mb-6 inline-block rounded-md bg-navy-950 px-3 py-2">
          <Brand />
        </div>
        <h1 className="text-2xl font-semibold text-navy-950">Admin login</h1>
        <p className="mt-2 text-sm text-slate-600">Secure staff access for Smart Profits Trader.</p>
        <label htmlFor="admin-email" className="mt-6 grid gap-1 text-sm font-medium text-slate-700">Email<input id="admin-email" name="email" autoComplete="email" className="rounded-md border border-slate-200 px-3 py-2" type="email" /></label>
        <label htmlFor="admin-password" className="mt-4 grid gap-1 text-sm font-medium text-slate-700">Password<input id="admin-password" name="password" autoComplete="current-password" className="rounded-md border border-slate-200 px-3 py-2" type="password" /></label>
        <button type="submit" className="mt-6 w-full rounded-md bg-profit-500 px-4 py-3 text-sm font-bold text-navy-950">Sign in</button>
      </form>
    </main>
  );
}
