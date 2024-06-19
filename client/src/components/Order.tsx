import { useState } from "react";
import Popup from "reactjs-popup";
import "../css/orderPopup.css";
import { useSocketContext } from "../hooks/useSocketContext";
import { useSimContext } from "../hooks/useSimContext";

type Props = {
  type: "Buy" | "Sell";
  stockSymbol: string;
};

function Order({ type, stockSymbol }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState("");
  const [responseMsg, setResponseMsg] = useState<string | null>(null);
  const [btnIsDisabled, setBtnIsDisabled] = useState(false);
  const socket = useSocketContext();
  const { searched, liquidCash } = useSimContext();

  const openModal = () => {
    socket.emit("change-speed", 0);
    setIsOpen((o) => !o);
  };

  const closeModal = () => {
    setCount("");
    setResponseMsg(null);
    socket.emit("change-speed", 1);
    setIsOpen(false);
  };

  const handleKeyDown = (e: any) => {
    const kc = e.keyCode;
    // enter key
    if (kc === 13) return handleOrderPlaced();
    //1-9 or backspace
    if ((kc !== 8 && kc < 48) || kc > 57) e.preventDefault();
  };

  const getCalculation = (): string => {
    const stockPrice = searched?.close.toFixed(2);
    const countNumb = Number(count);
    const price = searched && (searched.close * countNumb).toFixed(2);

    return `$${stockPrice} * ${countNumb} = $${price}`;
  };

  //TODO: fix this abomonation of code, move validation logic server side
  const handleOrderPlaced = async () => {
    setBtnIsDisabled(true);
    setCount("");

    if (!searched) {
      setBtnIsDisabled(false);
      return;
    }
    const price = Number(count) * searched?.close;
    const placedCount = Number(count);
    const reqBody = JSON.stringify({
      symbol: stockSymbol,
      amount: placedCount,
      price: price,
    });

    try {
      const resp = await fetch(`/api/users/portfolio/${type.toLowerCase()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: reqBody,
      });

      const json = await resp.json();

      if (json.error) {
        setResponseMsg(json.error);
      } else {
        setResponseMsg(json.msg);
      }
    } catch (error) {
      console.log(error);
    }

    setBtnIsDisabled(false);
  };

  return (
    <div>
      <button onClick={openModal}>{type} Order</button>
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
            <strong>Price:</strong>
            {getCalculation()}
          </p>
          <p>
            <strong>Cash on hand: </strong>${liquidCash.toFixed(2)}
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
