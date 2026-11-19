/**
 * Harness glue (stub) — NOT from the docs.
 *
 * The Multimodal Attachments page's "URL (hosted)" tab posts the file to
 * `/api/upload` and expects `{ url }` back; the page never shows the route.
 * A real app would put the file in object storage and return its public URL.
 * This stub has no storage: it returns the file as a `data:` URL, which the
 * model can read without the file ever being hosted anywhere.
 */
export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "no file" }, { status: 400 });
  }
  const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");
  return Response.json({
    url: `data:${file.type || "application/octet-stream"};base64,${base64}`,
  });
}
