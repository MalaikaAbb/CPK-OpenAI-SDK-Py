"use client";

/**
 * Headless Interrupts — from Code tab, trimmed.
 *
 * The page's prose has no code at all. It describes the pattern and shows a
 * "Not available on this framework" banner. This file is the Code tab's
 * src/app/demos/interrupt-headless/page.tsx, cut down to what the feature
 * needs: `useInterrupt({ renderInChat: false })`, the element it returns
 * placed outside the chat, and the popup that resolves it.
 *
 * Removed (labelled where they were):
 *   - the nested `<CopilotKit runtimeUrl="/api/copilotkit" agent=…>`: the root
 *     provider serves `interrupt-headless`.
 *   - useConfigureSuggestions (suggestion pills): decorative.
 *   - EmptyState's SVG icon: decorative.
 * `../_shared/interrupt-fallback-slots` is unpublished; a glue version sits
 * next to this folder.
 */

import React, { useEffect, useState } from "react";
import { CopilotChat, useInterrupt } from "@copilotkit/react-core/v2";
import { generateFallbackSlots } from "../_shared/interrupt-fallback-slots";
import type { TimeSlot } from "../_shared/interrupt-fallback-slots";

// The interrupt `schedule_meeting` pauses with. The adapter publishes the
// paused call's arguments on `metadata.tool_input` (see
// src/demo_agents/interrupt_agent.py); `slots` is never among them, so the
// picker falls back to generated slots.
type InterruptPayload = {
  topic?: string;
  attendee?: string;
  slots?: TimeSlot[];
};

function readInterruptPayload(
  interrupt: { metadata?: unknown } | null | undefined,
): InterruptPayload {
  const metadata = interrupt?.metadata as
    | { tool_input?: InterruptPayload }
    | undefined;
  const input = metadata?.tool_input;
  return input && typeof input === "object" ? input : {};
}

// removed: InterruptHeadlessDemo's nested <CopilotKit> (root provider used).
export default function InterruptHeadlessDemo() {
  return <Layout />;
}

function Layout() {
  const [resolving, setResolving] = useState(false);
  const interruptElement = useInterrupt({
    agentId: "interrupt-headless",
    renderInChat: false,
    render: ({ interrupt, resolve }) => {
      const payload = readInterruptPayload(interrupt);
      const resumeAfterPaint = (response: unknown) => {
        setResolving(true);
        // A frame boundary lets React paint before resume unmounts the
        // interrupt, but `requestAnimationFrame` never fires in a background
        // tab, so a timer runs whichever comes first and the resume cannot be
        // stranded. Fire-and-forget by design: a rejected resume is re-surfaced
        // globally instead of disappearing.
        let fired = false;
        const resumeOnce = () => {
          if (fired) return;
          fired = true;
          void resolve(response).then(
            () => setResolving(false),
            (error) => {
              setResolving(false);
              queueMicrotask(() => {
                throw error;
              });
            },
          );
        };
        requestAnimationFrame(resumeOnce);
        window.setTimeout(resumeOnce, 100);
      };
      return (
        <TimeSlotPopup
          payload={payload}
          onPick={(slot) => {
            resumeAfterPaint({
              approved: true,
              chosen_time: slot.iso,
              chosen_label: slot.label,
            });
          }}
          onCancel={() => {
            resumeAfterPaint({ approved: false });
          }}
        />
      );
    },
  });

  useEffect(() => {
    if (interruptElement) {
      setResolving(false);
    }
  }, [interruptElement]);

  // removed: useConfigureSuggestions(...) — decorative suggestion pills.

  // Harness change (labelled): `h-screen` → `h-full`, to fit under the demo frame's bar.
  return (
    <div className="grid h-full grid-cols-[1fr_420px] bg-[#FAFAFC] dark:bg-background">
      <AppSurface interruptElement={interruptElement} resolving={resolving} />
      <div className="border-l border-[#DBDBE5] bg-white dark:border-border dark:bg-background">
        <CopilotChat agentId="interrupt-headless" className="h-full" />
      </div>
    </div>
  );
}

type AppSurfaceProps = {
  interruptElement: React.ReactElement | null;
  resolving: boolean;
};

function AppSurface({ interruptElement, resolving }: AppSurfaceProps) {
  return (
    <div
      data-testid="interrupt-headless-app-surface"
      className="relative flex h-full flex-col overflow-hidden"
    >
      <header className="border-b border-[#DBDBE5] bg-white px-8 py-5 dark:border-border dark:bg-card">
        <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#57575B] dark:text-muted-foreground">
          Headless interrupt
        </div>
        <h1 className="text-xl font-semibold text-[#010507] dark:text-foreground">
          Scheduling
        </h1>
      </header>

      <div className="relative flex flex-1 items-center justify-center p-8">
        {interruptElement ?? (resolving ? <ResolvingState /> : <EmptyState />)}
      </div>
    </div>
  );
}

function ResolvingState() {
  return (
    <div data-testid="interrupt-headless-resolving" className="text-center">
      <div className="text-sm font-medium text-[#010507] dark:text-foreground">
        Confirming your selection…
      </div>
      <p className="mt-1 text-sm text-[#57575B] dark:text-muted-foreground">
        The assistant will post the confirmed booking in chat.
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      data-testid="interrupt-headless-empty"
      className="max-w-sm text-center"
    >
      {/* removed: decorative calendar SVG icon */}
      <div className="text-sm font-medium text-[#010507] dark:text-foreground">
        Nothing scheduled yet
      </div>
      <p className="mt-1 text-sm text-[#57575B] dark:text-muted-foreground">
        Ask the assistant to book something. When it needs your input, a picker
        will appear right here.
      </p>
    </div>
  );
}

type TimeSlotPopupProps = {
  payload: InterruptPayload;
  onPick: (slot: TimeSlot) => void;
  onCancel: () => void;
};

function TimeSlotPopup({ payload, onPick, onCancel }: TimeSlotPopupProps) {
  // One answer per interrupt: the buttons latch on the first click so a second
  // one cannot race the resume that is already in flight.
  const [answered, setAnswered] = useState(false);
  // The interrupt carries the topic and attendee, not the slots: the backend
  // pauses with the tool's arguments only, so the times below are generated
  // here, relative to "now", so the picker always shows future slots. The
  // payload branch stays for a backend that does send its own candidates.
  const slots =
    payload.slots && payload.slots.length > 0
      ? payload.slots
      : generateFallbackSlots();
  return (
    <div
      role="dialog"
      aria-modal="false"
      data-testid="interrupt-headless-popup"
      className="w-full max-w-md rounded-2xl border border-[#DBDBE5] bg-white p-6 shadow-[0_20px_40px_-20px_rgba(1,5,7,0.25)] dark:border-border dark:bg-card"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-[#85ECCE]" />
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#57575B] dark:text-muted-foreground">
          Pick a time
        </span>
      </div>
      <h2 className="mb-1 text-lg font-semibold text-[#010507] dark:text-foreground">
        {payload.topic ?? "Meeting"}
      </h2>
      {payload.attendee ? (
        <p className="mb-5 text-sm text-[#57575B] dark:text-muted-foreground">
          with{" "}
          <span className="font-medium text-[#010507] dark:text-foreground">
            {payload.attendee}
          </span>
        </p>
      ) : (
        <div className="mb-5" />
      )}

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {slots.map((slot) => (
          <button
            key={slot.iso}
            type="button"
            data-testid={`interrupt-headless-slot-${slot.iso}`}
            disabled={answered}
            onClick={() => {
              setAnswered(true);
              onPick(slot);
            }}
            className="rounded-xl border border-[#DBDBE5] bg-white px-3 py-3 text-sm font-medium text-[#010507] transition-colors hover:border-[#BEC2FF] hover:bg-[#BEC2FF1A] dark:border-border dark:bg-card dark:text-foreground dark:hover:border-[#BEC2FF] dark:hover:bg-[#BEC2FF1A] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {slot.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        data-testid="interrupt-headless-cancel"
        disabled={answered}
        onClick={() => {
          setAnswered(true);
          onCancel();
        }}
        className="mt-4 w-full rounded-xl border border-[#DBDBE5] bg-white px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[#57575B] transition-colors hover:bg-[#FAFAFC] dark:border-border dark:bg-card dark:text-muted-foreground dark:hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
      >
        Cancel
      </button>
    </div>
  );
}
