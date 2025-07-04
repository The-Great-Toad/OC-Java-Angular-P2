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

/**
 * The clicked data from a pie chart.
 */
export interface PieChartClickedData {
  /**
   * The name of the slice that was clicked.
   */
  name: string;

  /**
   * The value of the slice that was clicked.
   */
  value: number;

  /**
   * The label of the slice that was clicked.
   */
  label: string;
}
