export type SearchResult = {
  item: {
    symbol: string;
    name: string;
  };
  refIndex: number;
};

export type PortfolioItem = {
  id: string;
  amount: number;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjclose: number;
  volume: number;
};
