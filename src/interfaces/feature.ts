export interface IFeature {
  id: number;
  type: string;
  attributes: {
    external_id: string;
    mag_type: MagType;
    magnitude: string;
    place: string;
    time: string;
    title: string;
    tsunami: boolean;
    coordinates: {
      latitude: number;
      longitude: number;
    }
  }
  links: {
    external_url: string;
  }
}

export type MagType = 'md' | 'ml' | 'ms' | 'mw'| 'me'| 'mi'| 'mb'| 'mlg'