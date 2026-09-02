import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import LayoutFooter from "./layout/Footer";
import LayoutNavbar from "./layout/Navbar";
import ObserverProvider from "./context/ObserverProvider";
import { Oval } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";

const Home = lazy(() => import("./pages/Home"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const About = lazy(() => import("./pages/About"));
const Tournaments = lazy(() => import("./pages/Event&Tournaments"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contacts"));
const Partners = lazy(() => import("./pages/Partner"));
const TheClub = lazy(() => import("./pages/TheClub"));
const PlanTrip = lazy(() => import("./pages/PlanTrip"));
const Booking = lazy(() => import('./pages/Booking'))

function PageLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-150 w-full">
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
}

export default function App() {
  return (
    <ObserverProvider>
      <div className="overflow-hidden bg-white!">
        <BrowserRouter>
          <LayoutNavbar />
          <Suspense fallback={<PageLoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/GolfHolidays/PlanMyTrip" element={<PlanTrip />} />
              <Route path="/Tournaments" element={<Tournaments />} />
              <Route path="/Club" element={<TheClub />} />
              <Route path="/Gallery" element={<Gallery />} />
              <Route path="/About" element={<About />} />
              <Route path="/ContactUs" element={<Contact />} />
              <Route path="/Partners" element={<Partners />} />
              <Route path="/Events/Book" element = {<Booking />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
          <LayoutFooter />
        </BrowserRouter>
        <ToastContainer position="top-right" theme="colored" autoClose={3000} />
      </div>
    </ObserverProvider>
  );
}
