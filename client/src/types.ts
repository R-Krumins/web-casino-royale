export type SearchResult = {
  item: {
    symbol: string;
    name: string;
  };
  refIndex: number;
};

export type PortfolioItem = {
  symbol: string;
  amount: number;
  open: number;
  high: number;
  low: number;
  close: number;
  adjclose: number;
  volume: number;
};
