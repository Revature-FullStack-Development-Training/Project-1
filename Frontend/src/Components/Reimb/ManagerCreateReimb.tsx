import axios from "axios"
import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"

export const ManagerCreateReimb:React.FC = () => {

    const [reimb, setReimb] = useState({
        description: "",
        amount: 0,
        userId: store.loggedInUser.userId
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
        const response = await axios.post(store.baseUrl + "/reimbursements", reimb)
        .then(() => {alert("Reimbursement creation is successful!")
            navigate("/manager/reimbs")
        })
        .catch((error) => {alert("Reimbursement creation failed!")})
    }

    return(
        <Container className = "my-5 mx-auto">
            <h3>Create a Reimbursement for Manager {store.loggedInUser.firstName} {store.loggedInUser.lastName[0]}.:</h3>

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
                <Button className = "btn-dark" onClick = {() => navigate("/manager/reimbs")}> Back </Button>
            </div>
        </Container>
    )
}