import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './Components/LoginRegister/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css' // We need this for Bootstrap to work
import { CreateReimb } from './Components/Reimb/CreateReimb';
import { RegisterEmployee } from './Components/LoginRegister/RegisterEmployee';
import { Employees } from './Components/Employees/Employees';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "" element = {<Login/>}/>
          <Route path = "/register/employee" element = {<RegisterEmployee/>}/>
          <Route path = "/create/reimb" element = {<CreateReimb/>}/>
          <Route path = "/employees" element = {<Employees/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
