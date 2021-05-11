import { Redirect, useHistory } from "react-router-dom";
import { useState } from "react";
import Input from "../components/Input";
import axios from "axios";
const Publish = ({ userToken }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);

  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      //   console.log(response.data);
      // Rediriger l'utilisateur vers la page de l'annonce postée
      if (response.data._id) {
        history.push(`/offer/${response.data._id}`);
      } else {
        alert("Une erreur est survenue");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return userToken ? (
    <div className="publish-container">
      <h3>Publier votre article</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file">Ajoute une image </label>
        <input
          id="file"
          type="file"
          onChange={(event) => setPicture(event.target.files[0])}
        />
        {picture && <img src={URL.createObjectURL(picture)} />}
        <br />
        <br />

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          cols="30"
          rows="5"
          className="text"
        />
        <Input
          title="Titre"
          placeholder="ex: Chemise Sézane verte"
          type="text"
          value={title}
          setValue={setTitle}
        />
        <Input
          title="Marque"
          placeholder="ex: Zara"
          type="text"
          value={brand}
          setValue={setBrand}
        />
        <Input
          title="Taille"
          placeholder="ex: XL"
          type="text"
          value={size}
          setValue={setSize}
        />
        <Input
          title="Couleur"
          placeholder="ex: Bleu"
          type="text"
          value={color}
          setValue={setColor}
        />
        <Input
          title="État"
          placeholder="ex: neuf"
          type="text"
          value={condition}
          setValue={setCondition}
        />
        <Input
          title="Lieu"
          placeholder="ex: Paris"
          type="text"
          value={city}
          setValue={setCity}
        />
        <Input
          title="Prix"
          placeholder="ex: 12"
          type="number"
          value={price}
          setValue={setPrice}
        />
        <input className="add" type="submit" value="Ajouter" />
      </form>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Publish;
