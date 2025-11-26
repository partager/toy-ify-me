
export enum ToyStyleId {
  Funko = 'funko',
  Lego = 'lego',
  Nendoroid = 'nendoroid',
  ActionFigure = 'action_figure',
  Bearbrick = 'bearbrick',
  PopMart = 'pop_mart',
}

export interface ToyStyle {
  id: ToyStyleId;
  name: string;
  preview: string;
  prompt: string;
}
