import "@fontsource-variable/jetbrains-mono";
import "./App.css";
import { CursorReadout } from "./components/CursorReadout";
import { Navbar } from "./components/Navbar";
import { RulerLeft } from "./components/RulerLeft";
import { RulerTop } from "./components/RulerTop";
import { AboutPage } from "./pages/AboutPage";
import { WorkPage } from "./pages/WorkPage";
import { NotesPage } from "./pages/NotesPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Route, Routes } from "react-router";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="bg-zinc-900">
      <Navbar />
      <RulerTop />
      <RulerLeft />
      <Routes>
        {/* Static Routes */}
        <Route path="/" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/notes" element={<NotesPage />} />

        {/* Fallback Route (404 Page) */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <CursorReadout />
      <Footer />
    </div>
  );
}

export default App;
