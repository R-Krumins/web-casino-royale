import React from "react";

interface Props {
  stock: string;
  price: number;
}

function Stock(props: Props) {
  return (
    <div>
      <h1>{props.stock}</h1>
      <hr />
      <p>{"$" + props.price}</p>
    </div>
  );
}

export default Stock;
