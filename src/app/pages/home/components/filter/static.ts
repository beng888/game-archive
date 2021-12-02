export const ordering: { name: string; id: string }[] = [
  { name: 'name (a - z)', id: '-name' },
  { name: 'name (z - a)', id: 'name' },
  { name: 'released (newest)', id: '-released' },
  { name: 'released (oldest)', id: 'released' },
  { name: 'added  (newest)', id: '-added' },
  { name: 'added (oldest)', id: 'added' },
  { name: 'created  (newest)', id: '-created' },
  { name: 'created  (oldest)', id: 'created' },
  { name: 'updated  (newest)', id: '-updated' },
  { name: 'updated  (oldest)', id: 'updated' },
  { name: 'rating (highest)', id: '-rating' },
  { name: 'rating (lowest)', id: 'rating' },
  { name: 'metacritic (highest)', id: '-metacritic' },
  { name: 'metacritic (lowest)', id: 'metacritic' },
];

export interface top_NewRelease {
  name: string;
  url: string;
  q: any;
}

export const top: top_NewRelease[] = [
  {
    name: 'Best of the year',
    url: 'lists/greatest',
    q: { discover: true, ordering: '-added' },
  },
  {
    name: 'Popular in 2020',
    url: 'lists/greatest',
    q: { discover: true, ordering: '-added', year: 2020 },
  },
  { name: 'All time top 250', url: 'lists/popular', q: { discover: true } },
];

export const new_releases: top_NewRelease[] = [
  {
    name: 'Last 30 days',
    url: 'lists/recent-games-past',
    q: { discover: true, ordering: '-added' },
  },
  {
    name: 'This week',
    url: 'lists/recent-games',
    q: { discover: true, ordering: '-added' },
  },
  {
    name: 'Next week',
    url: 'lists/recent-games-future',
    q: { discover: true, ordering: '-added' },
  },
  {
    name: 'Release calendar',
    url: `calendar/${new Date().getFullYear()}/${new Date().getMonth() + 1}`,
    q: { popular: true, ordering: '-released' },
  },
];
