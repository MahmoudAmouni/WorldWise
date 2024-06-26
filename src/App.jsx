import { Navigate, Route, Routes } from "react-router";
import{ BrowserRouter } from "react-router-dom";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/fakeAuthContext";
import Protected from "./protection/protected";
import { Suspense, lazy } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";
// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
const Homepage = lazy(()=>import("./pages/Homepage"))
const Pricing = lazy(()=>import("./pages/Pricing"))
const Product = lazy(()=>import("./pages/Product"))
const PageNotFound = lazy(()=>import("./pages/PageNotFound"))
const Login = lazy(()=>import("./pages/Login"))
const AppLayout = lazy(()=>import("./pages/AppLayout"))


function App() {
  

  return (
    <CitiesProvider>
      <AuthProvider>
    <BrowserRouter>
    <Suspense fallback={<SpinnerFullPage />}>
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="/" element={<Homepage />} />
      <Route path="product" element={<Product />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="login" element={<Login />} />
      <Route path="app" element={
        <Protected>
        <AppLayout />
        </Protected>
      
      }
         >
      <Route index element={<Navigate replace to="cities" />} />
         <Route path="cities" element={<CityList/> } />
         <Route path="cities/:id" element={<City/> } />
         <Route path="countries" element={<CountryList /> } />
         <Route path="form" element={<Form /> } />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    </Suspense>
    </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  )
}

export default App
