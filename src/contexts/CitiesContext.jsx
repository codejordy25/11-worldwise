import {
  createContext,
  // useState,
  useEffect,
  useContext,
  useReducer,
} from "react";

const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();

//----------Initial State--------------------------------
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}
//----------------------------------------------------

function CitiesProvider({ children }) {
  //UseReducer
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "there was an error in Loading cities...",
        });
      }
    }
    fetchCities();
  }, []);

  //NECESSAIRE POUR LES MISES LIEES AUX VILES ET ETATS
  async function getCity(id) {
    if (Number(id) === currentCity.id) return; //Eviter les fetch redondants
    dispatch({ type: "loading" });
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);

      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error in Loading City...",
      });
    }
  }

  //NECESSAIRE POUR LES MISES LIEES AUX VILES ET ETATS
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
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
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error creating the City...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        //Mise Jour du server, Càd,l'etat distant
        method: "DELETE",
      });
      // Synchronisé la suppression du NewCity avec UI
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "there was an error deleting the City...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        error,
        createCity,
        deleteCity,
      }}
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
