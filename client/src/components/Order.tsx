import { useState } from "react";
import Popup from "reactjs-popup";
import "../css/orderPopup.css";

type Props = {
  type: "Buy" | "Sell";
};

function Order({ type }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState("");

  const closeModal = () => {
    setCount("");
    setIsOpen(false);
  };

  const handleKeyDown = (e: any) => {
    const kc = e.keyCode;
    // enter key
    if (kc === 13) return handleOrderPlaced();
    //1-9 or backspace
    if ((kc !== 8 && kc < 48) || kc > 57) e.preventDefault();
  };

  const handleOrderPlaced = () => {
    if (type === "Buy") handleBuy();
    if (type === "Sell") handleSell();
  };

  const handleBuy = () => {
    console.log("Bought", count);
  };

  const handleSell = () => {
    console.log("Sold", count);
  };

  return (
    <div>
      <button onClick={() => setIsOpen((o) => !o)}>Buy Order</button>
      <Popup open={isOpen} onClose={closeModal} modal>
        <div className="order-popup-container">
          <button className="close-btn" onClick={closeModal}>
            X
          </button>
          <h1>Place {type} Order</h1>
          <p>
            <strong>For: </strong> STCK
          </p>
          <p>
            <strong>Current Price</strong> $0
          </p>
          <input
            value={count}
            onKeyDown={handleKeyDown}
            onChange={(e) => setCount(e.target.value)}
            name="count"
            id=""
          />
          <button className="order-btn" onClick={handleOrderPlaced}>
            {type}
          </button>
        </div>
      </Popup>
    </div>
  );
}

export default Order;
