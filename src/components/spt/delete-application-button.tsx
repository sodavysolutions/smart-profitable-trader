"use client";

interface DeleteApplicationButtonProps {
  id: string;
  action: (formData: FormData) => Promise<void>;
}

export function DeleteApplicationButton({ id, action }: DeleteApplicationButtonProps) {
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        onClick={(e) => {
          if (!confirm("Delete this application? This cannot be undone.")) {
            e.preventDefault();
          }
        }}
        className="rounded-md bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
      >
        Delete
      </button>
    </form>
  );
}
