export type SearchResult = {
  item: {
    symbol: string;
    name: string;
  };
  refIndex: number;
};

export type PortfolioItem = {
  _id: string;
  amount: number;
  data: {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    adjclose: number;
    volume: number;
  };
};
