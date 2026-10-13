export const SIZES = ['XS', 'S', 'M', 'L', 'XL'] as const;
export type Size = (typeof SIZES)[number];

export const CUTS = ['Recto', 'Slim', 'Jogger', 'Cargo', 'Skinny'] as const;
export type Cut = (typeof CUTS)[number];

export interface Pantalon {
  id?: string;
  modelName: string;
  salePrice: number;
  isInStore: boolean;
  size: Size;
  cut: Cut;
  notes?: string;
}