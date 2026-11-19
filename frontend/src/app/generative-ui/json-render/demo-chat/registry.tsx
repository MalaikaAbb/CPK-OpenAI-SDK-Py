// doc: json-render — complete file printed in the page's Markdown export (verbatim).
// The rendered HTML page shows only the example JSON; the .md carries this file.
// src/app/demos/declarative-json-render/registry.tsx
import { defineRegistry } from "@json-render/react";
import { catalog } from "./catalog";
import { MetricCard } from "./metric-card";
import type { MetricCardComponentProps } from "./metric-card";
import { BarChart } from "./charts/bar-chart";
import type { BarChartComponentProps } from "./charts/bar-chart";
import { PieChart } from "./charts/pie-chart";
import type { PieChartComponentProps } from "./charts/pie-chart";

export const { registry } = defineRegistry(catalog, {
  components: {
    // The agent may nest charts inside a MetricCard root — forward children.
    MetricCard: ({ props, children }) => (
      <div className="flex w-full flex-col items-stretch gap-3">
        <MetricCard {...(props as MetricCardComponentProps)} />
        {children}
      </div>
    ),
    BarChart: ({ props }) => (
      <BarChart {...(props as BarChartComponentProps)} />
    ),
    PieChart: ({ props }) => (
      <PieChart {...(props as PieChartComponentProps)} />
    ),
  },
});
