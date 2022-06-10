import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../components/home/Home";
import UserCrud from "../components/user/UserCrud";
import About from "../components/about/About";

// eslint-disable-next-line import/no-anonymous-default-export
export default props =>
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/users" element={<UserCrud />} />
    <Route path="/about" element={<About />} />
    <Route path="*" element={<Home />} />
  </Routes>
