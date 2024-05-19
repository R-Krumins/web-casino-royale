import React from "react";

type Props = {
  item: string;
  price: string;
};

function ItemListing(props: Props) {
  return (
    <li className="item-listing">
      <h3 className="name">{props.item}</h3>
      <p className="price">{props.price}</p>
    </li>
  );
}

export default ItemListing;
