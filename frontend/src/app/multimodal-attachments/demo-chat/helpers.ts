/**
 * Harness glue (stubs) — NOT from the docs.
 *
 * The Multimodal Attachments snippets call `uploadToStorage(file)`,
 * `currentUser.id` and `toast.error(...)` and define none of them.
 */

/** Functional stub: the page uses it as "upload, give me back a URL". Posts to the /api/upload stub. */
export async function uploadToStorage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: formData });
  const { url } = await res.json();
  return url;
}

/** Stub: there is no signed-in user in the harness. */
export const currentUser = { id: "harness-demo-user" };

/** Stub: the page assumes a toast library; this one logs and alerts. */
export const toast = {
  error(message: string) {
    console.error("[toast.error stub]", message);
    window.alert(message);
  },
};
