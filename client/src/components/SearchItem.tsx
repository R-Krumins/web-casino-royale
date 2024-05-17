import React from "react";

type Props = {
  item: {
    symbol: string;
    name: string;
  };
  refIndex: number;
  score: number;
};

function SearchItem(props: Props) {
  return (
    <li>
      <p>
        <strong>{props.item.symbol}</strong>
        {props.item.name}
      </p>
    </li>
  );
}

export default SearchItem;
