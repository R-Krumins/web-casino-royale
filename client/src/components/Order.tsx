import { useState } from "react";
import Popup from "reactjs-popup";
import "../css/orderPopup.css";

type Props = {
  type: "Buy" | "Sell";
  stockSymbol: string;
};

function Order({ type, stockSymbol }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState("");
  const [responseMsg, setResponseMsg] = useState<string | null>(null);
  const [btnIsDisabled, setBtnIsDisabled] = useState(false);

  const closeModal = () => {
    setCount("");
    setResponseMsg(null);
    setIsOpen(false);
  };

  const handleKeyDown = (e: any) => {
    const kc = e.keyCode;
    // enter key
    if (kc === 13) return handleOrderPlaced();
    //1-9 or backspace
    if ((kc !== 8 && kc < 48) || kc > 57) e.preventDefault();
  };

  const handleOrderPlaced = async () => {
    setBtnIsDisabled(true);
    setCount("");
    const placedCount = type == "Buy" ? parseInt(count) : parseInt(count) * -1;
    try {
      const resp = await fetch(
        `/api/users/portfolio/add?id=${stockSymbol}&amount=${placedCount}`,
        { method: "POST" }
      );
      const json = await resp.json();

      setResponseMsg(json.msg);
    } catch (error) {
      console.log(error);
    }

    setBtnIsDisabled(false);
  };

  return (
    <div>
      <button onClick={() => setIsOpen((o) => !o)}>{type} Order</button>
      <Popup open={isOpen} onClose={closeModal} modal>
        <div className="order-popup-container">
          <button className="close-btn" onClick={closeModal}>
            X
          </button>
          <h1>Place {type} Order</h1>
          <p>
            <strong>For: </strong> {stockSymbol}
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
          <button
            className="order-btn"
            onClick={handleOrderPlaced}
            disabled={btnIsDisabled}
          >
            {type}
          </button>
          {responseMsg && <p>{responseMsg}</p>}
        </div>
      </Popup>
    </div>
  );
}

export default Order;
