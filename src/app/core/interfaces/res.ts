export interface Res<T> {
  results: Array<T>;
  related_tags: Tag[];
  description: string;
  seo_description: string;
  seo_h1: string;
  seo_keywords: string;
  seo_title: string;
  filters: RawgFilters;
}

export interface RawgFilters {
  genres: [{ id: number }] | [];
  parent_platforms: [{ id: number; platforms: [{ id: number }] }] | [];
  stores: [{ id: number }] | [];
  years: Year[] | [];
}

export interface List {
  type?: string;
  id?: number;
  name: string;
  slug?: string;
  games_count?: number;
  image_background?: string;
  games?: Array<List_Game>;
}

export interface Game {
  background_image: string;
  name: string;
  slug: string;
  released: string;
  metacritic: number;
  esrb_rating: {
    name: string;
  };
  genres: Array<List>;
  short_screenshots: Array<ScreenShot>;
  parent_platforms: Array<Parent_Platforms>;
}

export interface Browse {
  id: number;
  name: string;
  slug: string;
  domain?: string;
  positions?: Position[];
  games_count: number;
  image?: string;
  image_background: string;
  games: List_Game[];
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Year {
  decade: number;
  filter: string;
  from: number;
  to: number;
  years: [{ year: number }];
}

export interface Month {
  year: number;
  month: number;
  current: boolean;
}

export interface ScreenShot {
  image: string;
  height?: number;
  width?: number;
}

export interface Store {
  store: {
    id: number;
    name: string;
    slug: string;
    domain: string;
    games_count: number;
    image_background: string;
  };
}

export interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface Trailer {
  data: {
    480: string;
    max: string;
  };
  name: string;
  preview: string;
}

interface Parent_Platforms {
  platform: {
    name: string;
    slug: string;
  };
}

interface List_Game {
  id: number;
  name: string;
  slug: string;
  added: number;
}

interface Position {
  id: number;
  name: string;
  slug: string;
}
