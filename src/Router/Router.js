import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../Componentes/Login/Login';
import CreateUser from '../Componentes/CreateUser/CreateUser';
import TipoConta from '../Componentes/TipoConta/TipoConta';
import Loading from '../Componentes/Loading/Loading';
import Home from '../Componentes/Home/Home';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/tipoconta" element={<TipoConta />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
