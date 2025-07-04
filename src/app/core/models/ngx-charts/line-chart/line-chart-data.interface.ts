/**
 * Represents the data structure for a line chart.
 *
 * @property name - The name or label of the line chart data series.
 * @property series - An array of `Series` objects representing the data points for the line chart.
 */
export interface LineChartData {
  name: string;
  series: Series[];
}

/**
 * Represents a single data point in a line chart series.
 *
 * @property name - The name or label of the data point.
 * @property value - The numerical value associated with the data point.
 */
export interface Series {
  name: string;
  value: number;
}
