/**
 * Represents the raw data structure returned by the Olympic API for a single country.
 *
 * Example:
 * ```ts
 * {
 *   id: 1,
 *   country: 'Germany',
 *   participations: [
 *     {
 *       year: 2000,
 *       city: 'Sydney',
 *       medalsCount: 65,
 *       athleteCount: 300
 *     },
 *     ...
 *   ]
 * }
 * ```
 */
export interface OlympicCountry {
  /**
   * Unique ID of the country record.
   */
  id: number;

  /**
   * Country name.
   */
  country: string;

  /**
   * List of Olympic participations for the country.
   */
  participations: Participation[];
}

/**
 * Represents a single Olympic participation entry for a country.
 */
export interface Participation {
  /**
   * Olympic year.
   */
  year: number;

  /**
   * Host city of the Olympic games that year.
   */
  city: string;

  /**
   * Number of medals won during this Olympic event.
   */
  medalsCount: number;

  /**
   * Number of athletes the country sent to the games.
   */
  athleteCount: number;
}
