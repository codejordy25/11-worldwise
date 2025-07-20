import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  //acceder au formulaire lorsque nous cliquons quelque part sur la carte
  const [searhParams, setSearchParams] = useSearchParams();
  const lat = searhParams.get("lat");
  const lng = searhParams.get("lng");

  return (
    <div className={styles.mapContainer}>
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
