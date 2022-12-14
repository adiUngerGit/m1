import React, { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";

import Home from "./pages/Home";
import ShopList from "./pages/ShopList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/ShopList" element={<ShopList />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
