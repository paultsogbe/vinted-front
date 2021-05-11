import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="offer-card">
      <div>
        <img src={data.product_image.secure_url} alt={data.product_name} />
      </div>
      <div className="offer-details">
        <h4>{data.product_name}</h4>
        <span>{data.product_price} €</span>
        <p>MARQUE: {data.product_details.marque}</p>
        <p>TAILLE: {data.product_details.taille} </p>
        <p>ETAT: {data.product_details.etat} </p>
        <p>COULEUR: {data.product_details.couleur} </p>
        <p>EMPLACEMENT: {data.product_details.emplacement} </p>
        <Link className="payment" to="/payment">
          Acheter
        </Link>
      </div>
    </div>
  );
};

export default Offer;
