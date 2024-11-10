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

    const [unMsg, setUnMsg] = useState<string>("");
    const [pwdMsg, setPwdMsg] = useState<string>("");

    const navigate = useNavigate();

    const storeValues = (input: any) => {
        const name = input.target.name
        const value = input.target.value

        setLoginCreds((loginCreds) => ({...loginCreds, [name]: value}))
    }

    const validateFields = () => {
        let isValid = true;
    
        if (loginCreds.username === "") {
          setUnMsg("Username is required!");
          isValid = false;
        } else {
          setUnMsg("");
        }
    
        if (loginCreds.password === "") {
          setPwdMsg("Password is required!");
          isValid = false;
        } else {
          setPwdMsg("");
        }
    
        return isValid;
      };
 
    const login = async () => {

        let isValid = validateFields();
        
        if (!isValid) {
            return;
        }

        // Use te username/password in the loginCreds state object
        const response = await axios.post(store.baseUrl + "/auth", loginCreds)
        .then(

            // respon's definition doesn't exist if we just try to invoke it without an arrow function
            // React doen't know what the value is otherwise
            (response) => {

                // Saving the logged in user data locally
                store.loggedInUser = response.data

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
                    {unMsg ? <li style = {{marginLeft: 1 +"%", color: "red"}}>{unMsg}</li> : ""}
                </div>

                <div>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={storeValues}
                    />
                    {pwdMsg ? <li style = {{marginLeft: 1 +"%", color: "red"}}>{pwdMsg}</li> : ""}
                </div>
                

            <Button className="btn-success m-1" onClick = {login}>Login</Button>
            <Button className="btn-dark" onClick={()=>navigate("/register/employee")}>Register</Button>
        </Container>
    )
}