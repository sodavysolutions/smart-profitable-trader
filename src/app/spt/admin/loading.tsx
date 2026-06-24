export default function SPTAdminLoading() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="h-8 w-64 animate-pulse rounded-md bg-slate-200" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="h-36 animate-pulse rounded-md border border-slate-200 bg-white" />
          ))}
        </div>
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="h-80 animate-pulse rounded-md border border-slate-200 bg-white" />
          <div className="h-80 animate-pulse rounded-md border border-slate-200 bg-white" />
        </div>
      </div>
    </main>
  );
}
