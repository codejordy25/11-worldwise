// import {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   useReducer,
// } from "react";

// const BASE_URL = "http://localhost:9000";
// const CitiesContext = createContext();

// //----------Initial State--------------------------------
// const initialState = {
//   cities: [],
//   isLoading: false,
//   currentCity: {},
//   error: "",
// };

// function reducer(state, action) {
//   switch (action) {
//     case "loading":
//       return { ...state, isLoading: true };

//     case "city/loaded":
//       return { ...state, currentCity: action.payload, isLoading: false };

//     case "cities/loaded":
//       return { ...state, cities: action.payload, isLoading: false };

//     case "cities/created":
//       return {};

//     case "cities/deleted":
//       return {};

//     case "rejected":
//       return {
//         ...state,
//         isLoading: false,
//         error: action.payload,
//       };

//     default:
//       throw new Error("Unknown action");
//   }
// }
// //----------------------------------------------------

// function CitiesProvider({ children }) {
//   //UseReducer
//   const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
//     reducer,
//     initialState
//   );

//   // const [cities, setCities] = useState([]);
//   // const [isLoading, setIsLoading] = useState(false);
//   // const [currentCity, setCurrentCity] = useState({});

//   useEffect(() => {
//     async function fetchCities() {
//       try {
//         dispatch({ type: "loading" });
//         const res = await fetch(`${BASE_URL}/cities`);

//         const data = await res.json();
//         dispatch({ type: "cities/loaded", payload: data });
//       } catch {
//         alert("there was an error in Loading page...");
//       }
//     }
//     fetchCities();
//   }, []);

//   //NECESSAIRE POUR LES MISES LIEES AUX VILES ET ETATS
//   async function getCity(id) {
//     try {
//       dispatch({ type: "loading" });
//       const res = await fetch(`${BASE_URL}/cities/${id}`);

//       const data = await res.json();
//       dispatch({ type: "city/loaded", payload: data });
//     } catch {
//       dispatch({
//         type: "rejected",
//         payload: "there was an error in Loading City...",
//       });
//     }
//   }

//   //NECESSAIRE POUR LES MISES LIEES AUX VILES ET ETATS
//   async function createCity(newCity) {
//     try {
//       dispatch({ type: "loading" });
//       const res = await fetch(`${BASE_URL}/cities`, {
//         //Mise Jour du server, Càd,l'etat distant
//         method: "POST",
//         body: JSON.stringify(newCity),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await res.json();

//       // Synchronisé la creation du NewCity avec UI
//       //Ok Pour les PApp mais dans les grandes App Il faut React Query
//       //Nous Upadate Egalement le UI (Newobjet s'affiche)
//       setCities((cities) => [...cities, data]);
//     } catch {
//       alert("there was an error in creating City.");
//     }
//   }

//   async function deleteCity(id) {
//     try {
//       dispatch({ type: "loading" });
//       await fetch(`${BASE_URL}/cities/${id}`, {
//         //Mise Jour du server, Càd,l'etat distant
//         method: "DELETE",
//       });

//       // Synchronisé la suppression du NewCity avec UI
//       setCities((cities) => cities.filter((city) => city.id !== id));
//     } catch {
//       alert("there was an error in deleting city.");
//     }
//   }

//   return (
//     <CitiesContext.Provider
//       value={{
//         cities,
//         isLoading,
//         currentCity,
//         getCity,
//         createCity,
//         deleteCity,
//       }}
//     >
//       {children}
//     </CitiesContext.Provider>
//   );
// }

// function useCities() {
//   const context = useContext(CitiesContext);
//   if (context == undefined)
//     throw new Error("The context was used outside of the Citiesprovider");
//   return context;
// }

// export { CitiesProvider, useCities };
