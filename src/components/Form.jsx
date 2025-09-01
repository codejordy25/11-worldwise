// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import styles from "./Form.module.css";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  //Obtenir la positiion A partir de l'url de l'ouverture
  // C'est pourquoi(Creation du Hooks) nous utilisons useUrlPosition pour extraire les coordonnées
  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lat && !lng) return;
    async function fetchDataCity() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");

        //A chaque nous recuperons les données ici(fausse API)

        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        console.log(data);

        if (!data.countryCode) {
          throw new Error(
            "That doesn't seem to be a city. Please click somewere else"
          );
        }
        //Puis on les affichent joliment dans les formulaire
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeocodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchDataCity();
  }, [lat, lng]);

  // Je dois de faire de cette fonction, une fonction async
  // Pour qu'elle puisse retourner une promesse.
  //UNE FOIS LES DONNEES EN PLACE, NOUS SOMMES PRET SUBMIT LE FORM

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    //NOUS CREONS UN NOUVEAU OBJET
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    //Attend la promesse que la fct return, la nigation ne se produire automatiquement après son appel
    //QUE NOUS TRANSMETTONS DANS CETTE FONCTION QUE
    //QUE ALLONS FAIRE VIVRE DANS CITIESCONTEXT
    await createCity(newCity);

    //redigerer vers les villes créées
    //Nous retournons à la page où ns etions
    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere in the map" />;
  if (geocodingError) return <Message message={geocodingError} />;

  return (
    // nous voulons mettre un indicateur quand un user ajoute newCity
    // Quand on met plusieurs classes de styles on utilise le modèle littéral
    //Dans ce modele, chaque style doit dans des backticks {}
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd-MM-yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
