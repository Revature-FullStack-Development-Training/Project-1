import axios from "axios"
import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"

export const RegisterEmployee:React.FC = () => {

    const [employee, setEmployee] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: ""
    })

    const [unMsg, setUnMsg] = useState<string>("");
    const [pwdMsg, setPwdMsg] = useState<string>("");
    const [fnMsg, setFnMsg] = useState<string>("");
    const [lnMsg, setLnMsg] = useState<string>("");

    const navigate = useNavigate()

    const storeValues = (input: any) => {
        const name = input.target.name
        const value = input.target.value

        setEmployee((employee) => ({...employee, [name]: value}))
    }

    const validateFields = () => {
        let isValid = true;
    
        if (employee.username === "") {
          setUnMsg("Username is required!");
          isValid = false;
        } else {
          setUnMsg("");
        }
    
        if (employee.password === "") {
          setPwdMsg("Password is required!");
          isValid = false;
        } else {
          setPwdMsg("");
        }
    
        if (employee.firstName === "") {
          setFnMsg("First Name is required!");
          isValid = false;
        } else {
          setFnMsg("");
        }
    
        if (employee.lastName === "") {
          setLnMsg("Last Name is required!");
          isValid = false;
        } else {
          setLnMsg("");
        }
    
        return isValid;
      };

    const register = async () => {

        let isValid = validateFields();
        
        if (!isValid) {
            return;
        }
       

        // POST request - send the new user info to the backend
        const response = await axios.post(store.baseUrl + "/users", employee)
        .then(
          () => {
            alert("Employee registration is successful!")
            navigate("/")
          }
        )
        .catch((error) => {alert("Employee registration failed!")})


    }

    return(
        <Container className = "my-5 mx-auto">
            <div>
                <h1>Register an Employee</h1>
    
                <div>
                    <Form.Control
                        type = "text"
                        placeholder = "Username"
                        name = "username"
                        onChange = {storeValues}
                    />
                    {unMsg ? <li style = {{marginLeft: 1 +"%", color: "red"}}>{unMsg}</li> : ""}
                </div>

                <div>
                    <Form.Control
                        type = "password"
                        placeholder = "Password"
                        name = "password"
                        onChange = {storeValues}
                    />
                    {pwdMsg ? <li style = {{marginLeft: 1 +"%", color: "red"}}>{pwdMsg}</li> : ""}
                </div>

                <div>
                    <Form.Control
                        type = "text"
                        placeholder = "First Name"
                        name = "firstName"
                        onChange = {storeValues}
                    />
                    {fnMsg ? <li style = {{marginLeft: 1 +"%", color: "red"}}>{fnMsg}</li> : ""}
                </div>

                <div>
                    <Form.Control
                        type = "text"
                        placeholder = "Last Name"
                        name = "lastName"
                        onChange = {storeValues}
                    />
                    {lnMsg ? <li style = {{marginLeft: 1 +"%", color: "red"}}>{lnMsg}</li> : ""}
                </div>
    
                <div>
                    <Button className = "btn-success m-1" onClick = {register}> Register </Button>
                    <Button className = "btn-dark" onClick = {() => navigate("/")}> Back </Button>
                </div>
            </div>
        </Container>
    )
}