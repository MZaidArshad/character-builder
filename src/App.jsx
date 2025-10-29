import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import CharacterBuilder from "./pages/CharacterBuilder";
import WillWhispersCompendium from "./pages/Compendium";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WillWhispersCompendium />} />
      <Route path="/builder" element={<CharacterBuilder />} />
    </Routes>
  );
}

export default App;
