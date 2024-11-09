import axios from "axios";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { store } from "../../globalData/store";

export const Login:React.FC = () => {

    const[loginCreds, setLoginCreds] = useState({
        username:"",
        password:""
    })

    const navigate = useNavigate();

    const storeValues = (input: any) => {
        const name = input.target.name
        const value = input.target.value

        setLoginCreds((loginCreds) => ({...loginCreds, [name]: value}))
    }
 
    const login = async () => {
        // TODO: we should make sure the username/password are inputed first

        // Use te username/password in the loginCreds state object
        const response = await axios.post(store.baseUrl + "/auth", loginCreds)
        .then(

            // respon's definition doesn't exist if we just try to invoke it without an arrow function
            // React doen't know what the value is otherwise
            (response) => {

                // Saving the logged in user data locally
                store.loggedInUser = response.data
                console.log(response.data)
                console.log(store.loggedInUser)

                //greet the user
                alert("Welcome, " + store.loggedInUser.firstName + " " + store.loggedInUser.lastName[0])

                /*
                Depending on the user's role, send them to:
                    pets if they're a non admin
                    users if they're an admin
                */
                if (store.loggedInUser.title === "Manager") {
                    navigate("/employees")
                } else {
                    navigate("/reimbs")
                }
            }
        )
        .catch((error) => {alert("Login Failed! Please try again.")})

        // then() and catch()
    }
 
    

    return(
        /*Bootstrap gives us this Container element that does some default padding and centering*/
        <Container> 

            <h1>Welcome to the Employee Reimbursement System</h1>
                <h3>Please Log In:</h3>
                
                <div>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={storeValues}
                    />
                </div>

                <div>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={storeValues}
                    />
                </div>
                

            <Button className="btn-success m-1" onClick = {login}>Login</Button>
            <Button className="btn-dark" onClick={()=>navigate("/register/employee")}>Register</Button>
        </Container>
    )
}