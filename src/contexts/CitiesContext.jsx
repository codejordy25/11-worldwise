import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);

        const data = await res.json();
        setCities(data);
      } catch {
        alert("there was an error in Loading page...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);

      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("there was an error in Loading page...");
    } finally {
      setIsLoading(false);
    }
  }

  //NECESSAIRE POUR LES MISES LIEES AUX VILES ET ETATS
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        //Mise Jour du server, Càd,l'etat distant
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      // Synchronisé la creation du NewCity avec UI
      //Ok Pour les PApp mais dans les grandes App Il faut React Query
      //Nous Upadate Egalement le UI (Newobjet s'affiche)
      setCities((cities) => [...cities, data]);
    } catch {
      alert("there was an error in Loading page...");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, createCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context == undefined)
    throw new Error("The context was used outside of the Citiesprovider");
  return context;
}

export { CitiesProvider, useCities };
