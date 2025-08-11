import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./Map.module.css";
import { useState } from "react";
function Map() {
  //acceder au formulaire lorsque nous cliquons quelque part sur la carte
  const Navigate = useNavigate();
  const [searhParams, setSearchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const lat = searhParams.get("lat");
  const lng = searhParams.get("lng");

  return (
    //dans cette on ne pouvait pas utiliser le lien ou une focntion de navigation
    //car nous n'avons pas de composant de navigation
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>

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
