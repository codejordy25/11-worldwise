import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  //acceder au formulaire lorsque nous cliquons quelque part sur la carte
  const Navigate = useNavigate();
  const [searhParams, setSearchParams] = useSearchParams();
  const lat = searhParams.get("lat");
  const lng = searhParams.get("lng");

  return (
    //dans cette on ne pouvait pas utiliser le lien ou une focntion de navigation
    //car nous n'avons pas de composant de navigation
    <div className={styles.mapContainer} onClick={() => Navigate("/app/form")}>
      <h1> Map</h1>
      <h1>
        position: {lat}, {lng}
      </h1>
      <button onClick={() => setSearchParams({ lat: 25, lng: 30 })}>
        change pos
      </button>
    </div>
  );
}

export default Map;
