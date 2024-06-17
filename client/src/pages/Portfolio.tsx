import { useSimContext } from "../hooks/useSimContext";
import ItemListing from "../components/ItemListing";
import "../css/portfolio.css";

function Portfolio() {
  const { portfolio, portfolioValue, liquidCash } = useSimContext();

  return (
    <>
      <div className="stats">
        <h1>Portfolio</h1>
        <h3>Value: ${portfolioValue.toFixed(2)}</h3>
        <h3>Liquidity: ${liquidCash.toFixed(2)}</h3>
      </div>
      <ul id="portfolio-list">
        {portfolio?.map((item, index) => (
          <ItemListing
            key={index}
            item={item.symbol}
            amount={item.amount}
            price={item.close.toFixed(2)}
          />
        ))}
      </ul>
    </>
  );
}

export default Portfolio;
