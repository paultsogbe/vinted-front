import { Link } from "react-router-dom";

const OfferCard = ({ offer }) => {
  return (
    <Link className="offer" key={offer._id} to={`/offer/${offer._id}`}>
      <div style={{ border: "1px solid white" }}>
        <img
          style={{ height: 200, width: 150 }}
          src={offer.product_image.secure_url}
          alt={offer.product_name}
        />
        <h4>{offer.product_name}</h4>
        <p>{offer.product_price} €</p>
      </div>
    </Link>
  );
};

export default OfferCard;
