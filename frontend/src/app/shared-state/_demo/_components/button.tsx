/**
 * Harness glue — NOT from the docs.
 *
 * NotesCard (Shared State page) renders `<Button variant="destructive"
 * size="sm">`; the page never defines Button. Minimal stand-in supporting just
 * the variant and size it uses.
 */
import type { ButtonHTMLAttributes } from "react";

export function Button({
  variant,
  size,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "destructive" | "default";
  size?: "sm" | "default";
}) {
  const tone =
    variant === "destructive"
      ? "bg-rose-600 text-white hover:bg-rose-700"
      : "bg-slate-900 text-white hover:bg-slate-700";
  const pad = size === "sm" ? "px-2.5 py-1" : "px-3.5 py-2";
  return (
    <button
      className={`rounded-md font-medium ${tone} ${pad} ${className}`}
      {...props}
    />
  );
}
