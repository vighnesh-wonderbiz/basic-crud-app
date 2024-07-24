interface Query {
  start: number;
  limit: number;
  q: string;
  filter: string;
  count: number;
}

export default Query;
