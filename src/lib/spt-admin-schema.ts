export function isSchemaMismatchError(error: unknown) {
  if (!error || typeof error !== "object") return false;

  const candidate = error as { code?: string; message?: string };
  const message = candidate.message ?? "";

  return (
    candidate.code === "P2021" ||
    candidate.code === "P2022" ||
    /column .* does not exist/i.test(message) ||
    /relation .* does not exist/i.test(message) ||
    /table .* does not exist/i.test(message)
  );
}

export function getSchemaMismatchMessage(section: string) {
  return `${section} is still waiting on one or more live database tables or columns. The rest of your CRM is safe, but this section will stay in setup mode until the business schema repair is fully applied.`;
}
