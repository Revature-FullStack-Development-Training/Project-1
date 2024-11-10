import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './Components/LoginRegister/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css' // We need this for Bootstrap to work
import { CreateReimb } from './Components/Reimb/CreateReimb';
import { RegisterEmployee } from './Components/LoginRegister/RegisterEmployee';
import { Employees } from './Components/Employees/Employees';
import { EmpReimbComponent } from './Components/Reimb/EmpReimbComponent';
import { ManagerComponent } from './Components/Managers/ManagerComponent';
import { ReimbTable } from './Components/Reimb/ReimbTable';
import { AllReimbs } from './Components/Reimb/AllReimbs';
import { EmployeeComponent } from './Components/Employees/EmployeeComponent';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "" element = {<Login/>}/>
          <Route path = "/register/employee" element = {<RegisterEmployee/>}/>
          <Route path = "/create/reimb" element = {<CreateReimb/>}/>
          <Route path = "/employees" element = {<Employees/>}/>
          <Route path = "/employee/reimbs" element = {<EmpReimbComponent/>}/>
          <Route path = "/manager" element = {<ManagerComponent/>}/>
          <Route path = "/employee" element = {<EmployeeComponent/>}/>
          <Route path = "/reimbs" element = {<AllReimbs/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
