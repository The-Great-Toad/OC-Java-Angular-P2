/**
 * A single data entry used in a pie chart.
 *
 * @example
 * {
 *   name: 'Germany',
 *   value: 88
 * }
 */
export interface PieChartData {
  /**
   * Label of the slice (e.g. country name).
   */
  name: string;

  /**
   * Numeric value of the slice (e.g. medal count).
   */
  value: number;
}
