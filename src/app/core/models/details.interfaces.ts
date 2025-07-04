/**
 * Interface for details block data used in the dashboard and country detail components.
 */
export interface DetailsBlockData {
  title: string;
  details: Details[];
}

/**
 * Interface for individual details used in the details block.
 * Each detail consists of a label and a value.
 *
 * Example:
 * ```ts
 * {
 *   label: 'Number of olympics',
 *   value: 30
 * }
 * ```
 */
export interface Details {
  label: string;
  value: number | string;
}
