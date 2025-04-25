export interface PopulationCompositionPerYear {
  boundaryYear: number;
  data: [
    {
      label: string;
      data: {
        year: number;
        value: number;
        rate: number;
      }[];
    },
  ];
}
