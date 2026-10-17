import { useState, type MouseEvent } from "react";
import "@fontsource-variable/jetbrains-mono";
import "./App.css";
import { CursorReadout } from "./components/CursorReadout";
import { Navbar } from "./components/Navbar";
import { RulerLeft } from "./components/RulerLeft";
import { RulerTop } from "./components/RulerTop";
import { AboutPage } from "./pages/AboutPage";
import { WorkPage } from "./pages/WorkPage";
import { NotesPage } from "./pages/NotesPage";
import { Route, Routes } from "react-router";

function App() {
  const [coords, setCoords] = useState({ x: "0000", y: "0000" });

  const pad = (n: any) => String(Math.round(n)).padStart(4, "0");

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    setCoords({
      x: pad(e.clientX),
      y: pad(e.clientY),
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="bg-zinc-900 h-screen w-screen"
    >
      <Navbar />
      <RulerTop />
      <RulerLeft />
      <Routes>
        {/* Static Routes */}
        <Route path="/" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/notes" element={<NotesPage />} />

        {/* Fallback Route (404 Page) */}
        {/*<Route path="*" element={<NotFound />} />*/}
      </Routes>
      <CursorReadout positionX={coords.x} positionY={coords.y} />
    </div>
  );
}

export default App;
