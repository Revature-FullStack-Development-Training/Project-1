import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"
import { Button, Container } from "react-bootstrap"
import { ManagerPendReimbTable } from "./ManagerPendReimbTable"

export const ManagerPendReimbs:React.FC = () => {
    
    const [reimbs, setReimbs] = useState([])
    
    useEffect(() => {
        getReimbs()
    }, [])

    const navigate = useNavigate()

    const getReimbs = async () => {
        // axios GET request
        const response = await axios.get(store.baseUrl + "/reimbursements/pending")
        .then(
            (response) => {
                // Populate the reimbs state object
                setReimbs(response.data) // data holds the data sent in the response body
            })
        .catch((error) => {alert("Fetching reimbs failed!")})
    }

    return(
        <Container className = "my-5 mx-auto">
            <h3>Manager {store.loggedInUser.firstName} {store.loggedInUser.lastName[0]}.</h3>
                <div className = "d-flex justify-content-end">
                    <Button className = "btn-dark" onClick = {() => navigate("/manager")}> Back </Button>
                </div>
            <h5> Pending Reimbursement(s): </h5>
            <ManagerPendReimbTable  incomingReimbs = {reimbs}></ManagerPendReimbTable>
        </Container>
    )
}