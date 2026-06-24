"use client";

export default function SPTAdminError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-xl rounded-md border border-red-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-600">Admin workspace error</p>
        <h1 className="mt-3 text-3xl font-semibold text-navy-950">We hit a problem loading this CRM page.</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Your data has not been changed. Try refreshing this section. If the issue continues, check the database
          connection, environment variables, and the latest deployment logs.
        </p>
        <p className="mt-4 rounded-md bg-slate-50 p-3 text-xs text-slate-500">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-md bg-profit-500 px-5 py-3 text-sm font-bold text-navy-950"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
