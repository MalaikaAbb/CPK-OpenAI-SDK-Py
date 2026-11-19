"use client"; // from Code tab: the prose omits it

/**
 * Human in the Loop, Pattern 1: the page's `hitl-in-chat/page.tsx`.
 *
 * The prose prints this file up to the end of the useHumanInTheLoop call and
 * stops there. The closing `return <CopilotChat … />` and braces, and
 * "use client", are from Code tab (src/app/demos/hitl-in-chat/page.tsx),
 * which is otherwise identical.
 */
// ── doc: human-in-the-loop prose block "hitl-in-chat/page.tsx" (verbatim) ──
import React from "react";
import {
  CopilotKit,
  CopilotChat,
  useHumanInTheLoop,
  useConfigureSuggestions,
} from "@copilotkit/react-core/v2";
import { z } from "zod";
import type { TimeSlot } from "./time-picker-card";
import { TimePickerCard } from "./time-picker-card";
// ── end doc (imports) ──
// Harness change (labelled): one Inspector per page; see lib/inspector.ts.
import { nestedInspectorSetting } from "@/lib/inspector";
// ── doc: human-in-the-loop prose block "hitl-in-chat/page.tsx" (continued) ──

const DEFAULT_SLOTS: TimeSlot[] = [
  { label: "Tomorrow 10:00 AM", iso: "2026-04-19T10:00:00-07:00" },
  { label: "Tomorrow 2:00 PM", iso: "2026-04-19T14:00:00-07:00" },
  { label: "Monday 9:00 AM", iso: "2026-04-21T09:00:00-07:00" },
  { label: "Monday 3:30 PM", iso: "2026-04-21T15:30:00-07:00" },
];

export default function HitlInChatDemo() {
  return (
    // Harness change (labelled): the doc's runtimeUrl is "/api/copilotkit",
    // this repo's verbatim Quickstart runtime, which registers only
    // `openai_agent`. enableInspector is also the harness's.
    <CopilotKit
      runtimeUrl="/api/harness"
      agent="hitl-in-chat"
      enableInspector={nestedInspectorSetting}
    >
      <div className="flex justify-center items-center h-screen w-full">
        <div className="h-full w-full max-w-4xl">
          <Chat />
        </div>
      </div>
    </CopilotKit>
  );
}

function Chat() {
  useConfigureSuggestions({
    suggestions: [
      {
        title: "Book a call with sales",
        message:
          "Please book an intro call with the sales team to discuss pricing.",
      },
      {
        title: "Schedule a 1:1 with Alice",
        message: "Schedule a 1:1 with Alice next week to review Q2 goals.",
      },
    ],
    available: "always",
  });

  useHumanInTheLoop({
    agentId: "hitl-in-chat",
    name: "book_call",
    description:
      "Ask the user to pick a time slot for a call. The picker UI presents fixed candidate slots; the user's choice is returned to the agent.",
    parameters: z.object({
      topic: z
        .string()
        .describe("What the call is about (e.g. 'Intro with sales')"),
      attendee: z
        .string()
        .describe("Who the call is with (e.g. 'Alice from Sales')"),
    }),
    render: ({ args, status, respond }: any) => (
      <TimePickerCard
        topic={args?.topic ?? "a call"}
        attendee={args?.attendee}
        slots={DEFAULT_SLOTS}
        status={status}
        onSubmit={(result) => respond?.(result)}
      />
    ),
  });
  // ── end doc ──
  // ── from Code tab: the tail the prose cuts off ──

  return <CopilotChat agentId="hitl-in-chat" className="h-full rounded-2xl" />;
}
// ── end Code tab ──
