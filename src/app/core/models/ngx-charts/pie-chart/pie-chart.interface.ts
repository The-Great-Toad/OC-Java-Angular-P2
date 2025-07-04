import { TemplateRef } from '@angular/core';
import { PieChartData } from './pie-chart-data.interface';
import { Color } from '@swimlane/ngx-charts';

/**
 * Options and configuration settings for a standard ngx-charts Pie Chart.
 */
export interface PieChartOptions {
  /**
   * Dimensions of the chart in pixels: [width, height].
   * If not provided, the chart will adapt to the parent container.
   *
   * @example [600, 400]
   */
  view?: [number, number];

  /**
   * Dataset used to build the chart. Each object must contain a `name` and `value`.
   */
  results: PieChartData[];

  /**
   * Defines the color scheme of the chart slices.
   * You can use a built-in ngx-charts color scheme or a custom one.
   */
  scheme: string | Color;

  /**
   * Custom color overrides for specific data entries.
   * Can be an object mapping names to color codes.
   *
   * @example { 'USA': '#ff0000' }
   */
  customColors?: object;

  /**
   * Enables animations during render.
   * Default: true
   */
  animations?: boolean;

  /**
   * Display data labels on each slice.
   * Default: false
   */
  labels: boolean;

  /**
   * Custom formatter for label text.
   *
   * @example (label: string) => label.toUpperCase()
   */
  labelFormatting?: (label: string) => string;

  /**
   * Trims labels that exceed the maximum length.
   * Default: true
   */
  trimLabels: boolean;

  /**
   * Maximum label length (only applies if `trimLabels` is true).
   * Default: 10
   */
  maxLabelLength?: number;

  /**
   * Show or hide the legend box.
   * Default: true
   */
  legend: boolean;

  /**
   * Title displayed above the legend.
   * Default: 'Legend'
   */
  legendTitle?: string;

  /**
   * Position of the legend box: 'right' or 'below'.
   * Default: 'right'
   */
  legendPosition?: 'right' | 'below';

  /**
   * Adjusts the radius of each slice based on its value.
   * Default: false
   */
  explodeSlices?: boolean;

  /**
   * Renders the chart as a doughnut instead of full pie.
   * Default: false
   */
  doughnut: boolean;

  /**
   * Controls the width of the doughnut’s arc (as a fraction of radius).
   * Only relevant when `doughnut` is true.
   * Default: 0.25
   */
  arcWidth?: number;

  /**
   * Applies a color gradient to the pie slices.
   * Default: false
   */
  gradient?: boolean;

  /**
   * Entries to visually highlight in the chart.
   */
  activeEntries?: PieChartData[];

  /**
   * Disables tooltips.
   * Default: false
   */
  tooltipDisabled?: boolean;

  /**
   * Function used to format the tooltip text.
   *
   * @example (data: PieChartData) => `${data.name}: ${data.value} medals`
   */
  tooltipText?: (data: PieChartData) => string;

  /**
   * Custom Angular template for the tooltip.
   */
  tooltipTemplate?: TemplateRef<any>;
}
