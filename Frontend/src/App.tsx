import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './Components/LoginRegister/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css' // We need this for Bootstrap to work
import { RegisterEmployee } from './Components/LoginRegister/RegisterEmployee';
import { Employees } from './Components/Employees/Employees';
import { EmployeeAllReimbs } from './Components/Reimb/EmployeeAllReimbs';
import { Manager } from './Components/Managers/Manager';
import { ManagerAllReimbs } from './Components/Reimb/ManagerAllReimbs';
import { Employee } from './Components/Employees/Employee';
import { ManagerCreateReimb } from './Components/Reimb/ManagerCreateReimb';
import { EmployeeCreateReimb } from './Components/Reimb/EmployeeCreateReimb';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "" element = {<Login/>}/>
          <Route path = "/register/employee" element = {<RegisterEmployee/>}/>
          <Route path = "/create/manager/reimb" element = {<ManagerCreateReimb/>}/>
          <Route path = "/create/employee/reimb" element = {<EmployeeCreateReimb/>}/>
          <Route path = "/employees" element = {<Employees/>}/>
          <Route path = "/employee/reimbs" element = {<EmployeeAllReimbs/>}/>
          <Route path = "/manager" element = {<Manager/>}/>
          <Route path = "/employee" element = {<Employee/>}/>
          <Route path = "/manager/reimbs" element = {<ManagerAllReimbs/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
