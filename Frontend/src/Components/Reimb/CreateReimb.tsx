import axios from "axios"
import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"

export const CreateReimb:React.FC = () => {

    const [reimb, setReimb] = useState({
        description: "",
        amount: 0,
        userIdFk: 0
    })

    const [descMsg, setDescMsg] = useState<string>("");
    const [amntMsg, setAmntMsg] = useState<string>("");

    const navigate = useNavigate()

    const storeValues = (input: any) => {
        const name = input.target.name
        const value = input.target.value

        setReimb((reimb) => ({...reimb, [name]: value}))
    }

    const validateFields = () => {
        let isValid = true;
    
        if (reimb.description === "") {
          setDescMsg("Description is required!");
          isValid = false;
        } else {
          setDescMsg("");
        }
    
        if (reimb.amount === 0) {
          setAmntMsg("Amount is required!");
          isValid = false;
        } else {
          setAmntMsg("");
        }
    
        return isValid;
      };

    const register = async () => {

        let isValid = validateFields();
        
        if (!isValid) {
            return;
        }
       

        // POST request - send the new user info to the backend
        const response = await axios.post(store.baseUrl + "/reimbs", reimb)
        .then(() => {alert("Reimbursement registration is successful!")})
        .catch((error) => {alert("Reimbursement registration failed!")})
    }

    return(
        <Container className = "my-5 mx-auto">
            <div>
                <h1>Create a Reimbursement</h1>
    
                <div>
                    <Form.Control
                        type = "text"
                        placeholder = "Description"
                        name = "description"
                        onChange = {storeValues}
                    />
                    {descMsg ? <li style = {{marginLeft: 1 +"%", color: "red"}}>{descMsg}</li> : ""}
                </div>

                <div>
                    <Form.Control
                        type = "number"
                        placeholder = "Amount"
                        name = "amount"
                        onChange = {storeValues}
                    />
                    {amntMsg ? <li style = {{marginLeft: 1 +"%", color: "red"}}>{amntMsg}</li> : ""}
                </div>

                <div>
                    <Button className = "btn-success m-1" onClick = {register}> Create </Button>
                    <Button className = "btn-dark" onClick = {() => navigate("/")}> Back </Button>
                </div>
            </div>
        </Container>
    )
}