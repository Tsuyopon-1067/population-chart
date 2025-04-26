import { PopulationCompositionEntry } from './populationCompositionEntry';

export interface PopulationCompositionPerYear {
  boundaryYear: number;
  data: [
    {
      label: string;
      data: PopulationCompositionEntry[];
    },
  ];
}
