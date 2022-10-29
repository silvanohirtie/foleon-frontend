import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/Home/HomeView";
import PageView from "./views/Page/PageView";
import ImageView from "./views/Image/ImageView";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />}></Route>
        <Route path="/images" element={<HomeView />}></Route>
        <Route path="/images/:id" element={<ImageView />}></Route>
        <Route path="/pages" element={<HomeView />}></Route>
        <Route path="/pages/:id" element={<PageView />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
