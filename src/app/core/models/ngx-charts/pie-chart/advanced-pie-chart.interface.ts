import { TemplateRef } from '@angular/core';
import { Color } from '@swimlane/ngx-charts';
import { PieChartData } from './pie-chart-data.interface';

/**
 * Represents the configuration options for an ngx-charts advanced pie chart.
 */
export interface AdvancedPieChartOptions {
  /**
   * Chart dimensions as [width, height].
   * If not specified, the chart will adapt to the parent container.
   *
   * @example [700, 400]
   */
  view?: [number, number];

  /**
   * Data set to be rendered by the pie chart.
   * Should be an array of objects with `name` and `value` fields.
   *
   * @example [{ name: 'France', value: 50 }]
   */
  results: PieChartData[];

  /**
   * The color scheme used for the chart segments.
   * Can use built-in color schemes from ngx-charts.
   */
  scheme: string | Color;

  /**
   * Custom colors for specific data values.
   * Can be an object or a function mapping data names to color values.
   *
   * @example
   * {
   *   Germany: '#ff0000',
   *   France: '#0000ff'
   * }
   */
  customColors?: object | ((name: string) => string);

  /**
   * Enables or disables animation effects.
   *
   * @default true
   */
  animations?: boolean;

  /**
   * Enables gradient fill for chart segments.
   *
   * @default false
   */
  gradient?: boolean;

  /**
   * List of entries to highlight (e.g. on mouse hover).
   *
   * @example
   * [{ name: 'France', value: 22 }]
   */
  activeEntries?: PieChartData[];

  /**
   * Custom text label displayed below the total value.
   *
   * @default 'Total'
   */
  label?: string;

  /**
   * Whether tooltips should be disabled.
   *
   * @default false
   */
  tooltipDisabled?: boolean;

  /**
   * A custom Angular template for the tooltip content.
   */
  tooltipTemplate?: TemplateRef<any>;

  /**
   * A custom function to format the numeric values in the chart legend.
   *
   * @example
   * value => value + ' medals'
   */
  valueFormatting?: (value: number) => string;

  /**
   * A custom function to format the data labels (names).
   *
   * @example
   * name => name.toUpperCase()
   */
  nameFormatting?: (name: string) => string;

  /**
   * A custom function to format the percentage values shown in the chart.
   *
   * @example
   * pct => pct.toFixed(1) + '%'
   */
  percentageFormatting?: (percentage: number) => string;
}
