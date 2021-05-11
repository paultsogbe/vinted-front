import { useEffect, useState } from "react";
import axios from "axios";
import OfferCard from "../components/OfferCard";
import Banner from "./banner.jpg";
import { Link, Redirect } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <div
        className="banner"
        style={{ backgroundImage: "url(" + Banner + ")" }}
      >
        <div className="card">
          <h1>Prêts à faire du tri dans vos placard ?</h1>
          <Link className="publish" to="/publish">
            Commencer à vendre
          </Link>
          {/* <img alt="Banner" src={Banner} /> */}
        </div>
      </div>
      <h2>Articles populaires</h2>
      <div className="offers">
        {data.offers.map((offer) => {
          return <OfferCard key={offer._id} offer={offer} />;
        })}
      </div>
    </>
  );
};

export default Home;
