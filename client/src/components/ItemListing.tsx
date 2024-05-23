import TokenIcon from "../assets/poker-chip.svg?react";

type Props = {
  item: string;
  price: string;
};

function ItemListing(props: Props) {
  return (
    <li className="item-listing">
      <div className="item-listing-container">
        <div className="token-div">
          <TokenIcon className="token" />
        </div>
        <div className="item-listing-container-inner">
          <div className="left-div">
            <h3>{props.item}</h3>
            <p>Compnay name</p>
          </div>

          <p>
            {"(x69)"}&#160;&#160;&#160;{"$" + props.price}
          </p>
        </div>
      </div>

      <hr />
    </li>
  );
}

export default ItemListing;
