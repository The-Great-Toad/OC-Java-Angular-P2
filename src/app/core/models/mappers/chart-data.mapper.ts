import { PieChartData } from '../ngx-charts/pie-chart/pie-chart-data.interface';
import { OlympicCountry } from '../olympics.interfaces';

/**
 * Maps a list of OlympicCountry data to PieChartData format.
 * Each country's total medal count is summed across all participations.
 *
 * @param countries - List of countries with Olympic data
 * @returns Chart-friendly data for ngx-charts
 */
export function mapToPieChartData(countries: OlympicCountry[]): PieChartData[] {
  return countries.map((country) => {
    const totalMedals = country.participations.reduce(
      (sum, p) => sum + p.medalsCount,
      0
    );

    return {
      name: country.country,
      value: totalMedals,
    };
  });
}
