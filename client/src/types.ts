export type SearchResult = {
  item: {
    symbol: string;
    name: string;
  };
  refIndex: number;
};

export type StockInfo = {
  _id: string;
  src: string | null;
  name: string | null;
  industry: string | null;
  desc: string | null;
  logo: string | null;
  wentPublic: string | null;
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
