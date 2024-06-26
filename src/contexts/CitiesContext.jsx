import { createContext, useCallback, useContext, useEffect, useReducer } from "react";

const CityContext = createContext();

const initialState = {
  isLoading: false,
  currentCity: {},
  cities: [],
  error: ""
};

function reducer(state, action) {
  switch (action.type) {
    case "cities/loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "cities/rejected":
      return { ...state, isLoading: false, error: action.payload };
    case "city/got":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(c => c.id !== action.payload),
        currentCity: {}
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function CitiesProvider({ children }) {
  const [{ isLoading, currentCity, cities, error }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetching() {
      dispatch({ type: "cities/loading" });
      try {
        const res = await fetch(`http://localhost:8020/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (e) {
        dispatch({ type: "cities/rejected", payload: "Fetching cities failed" });
      }
    }

    fetching();
  }, []);

 const getCity = useCallback( async function getCity(id) {
    dispatch({ type: "cities/loading" });
    try {
      const res = await fetch(`http://localhost:8020/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/got", payload: data });
    } catch (e) {
      dispatch({ type: "cities/rejected", payload: "Fetching city failed" });
    }
  },[])

  async function createCity(newCity) {
    dispatch({ type: "cities/loading" });
    try {
      const res = await fetch(`http://localhost:8020/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (e) {
      dispatch({ type: "cities/rejected", payload: "Creating city failed" });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "cities/loading" });
    try {
      const response = await fetch(`http://localhost:8020/cities/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      dispatch({ type: "city/deleted", payload: id });
    } catch (e) {
      dispatch({ type: "cities/rejected", payload: "Deleting city failed" });
    }
  }

  return (
    <CityContext.Provider
      value={{
        isLoading, cities,
        currentCity, error, getCity,
        createCity, deleteCity
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
