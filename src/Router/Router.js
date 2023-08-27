import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../Login/Login';
import CreateUser from '../CreateUser/CreateUser';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/createuser" element={<CreateUser/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
