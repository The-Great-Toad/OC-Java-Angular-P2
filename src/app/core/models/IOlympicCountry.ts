import { IParticipation } from './IParticipation';

export interface IOlympicCountry {
  id: number;
  country: string;
  participations: IParticipation[];
}
