import axios from "axios"
import { useEffect, useState } from "react"
import { store } from "../../globalData/store"
import { Button, Container } from "react-bootstrap"
import { ReimbTable } from "./ReimbTable"
import { useNavigate } from "react-router-dom"

export const ReimbComponent:React.FC = () => {

    const [reimbs, setReimbs] = useState([])

    const navigate = useNavigate()
    
    useEffect(() => {
        getReimbsByUserId()
    }, [])

    const getReimbsByUserId = async () => {
        // axios GET request
        // Note: using the ID of the loggedInUser to get only their reimbs
        const response = await axios.get(store.baseUrl + "/reimbursements/users/" + store.loggedInUser.userId)
        .then(
            (response) => {
                // Populate the reimbs state object
                setReimbs(response.data) // data holds the data sent in the response body
                console.log(response.data)
            })
        .catch((error) => {alert("Fetching reimbs failed!")})
    }

    return(
        <Container>

            <h3>{store.loggedInUser.firstName} {store.loggedInUser.lastName[0]} Reimbursement(s):</h3>
            {/*
            Sending the entire reimbs array to get rendered in the ReimbTable Component
            */}
            <ReimbTable incomingReimbs = {reimbs}></ReimbTable>
            <div>
                <Button className = "btn-success m-1" onClick = {() => navigate("/create/reimb")}> Create Reimbursement </Button>
                <Button className = "btn-dark" onClick = {() => navigate("/")}> Back </Button>
            </div>
            
        </Container>


    )


}