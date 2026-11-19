/**
 * Harness glue — NOT from the docs.
 *
 * NotesCard (Shared State page) renders Card / CardHeader / CardTitle /
 * CardDescription / CardContent, and the page never says where they come
 * from. These are the smallest stand-ins that render: plain elements with a
 * few classes, forwarding every prop.
 */
import type { HTMLAttributes } from "react";

type DivProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: DivProps) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: DivProps) {
  return <div className={`p-5 pb-3 ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }: DivProps) {
  return <div className={`text-base font-semibold ${className}`} {...props} />;
}

export function CardDescription({ className = "", ...props }: DivProps) {
  return (
    <div
      className={`text-sm text-slate-500 dark:text-slate-400 ${className}`}
      {...props}
    />
  );
}

export function CardContent({ className = "", ...props }: DivProps) {
  return <div className={`p-5 pt-0 ${className}`} {...props} />;
}
