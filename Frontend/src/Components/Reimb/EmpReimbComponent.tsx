import axios from "axios"
import { useEffect, useState } from "react"
import { store } from "../../globalData/store"
import { Button, Container } from "react-bootstrap"
import { ReimbTable } from "./ReimbTable"
import { useNavigate } from "react-router-dom"

export const EmpReimbComponent:React.FC = () => {

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
            })
        .catch((error) => {alert("Fetching reimbs failed!")})
    }

    return(
        <Container className = "my-5 mx-auto">

            <h3>Employee {store.loggedInUser.firstName} {store.loggedInUser.lastName[0]}</h3>
            <h5 className = "mt-5">Reimbursement(s):</h5>
            <div className = "d-flex justify-content-end">
                <div>
                    <Button className = "btn-success m-1" onClick = {() => navigate("/create/reimb")}> Create Reimbursement </Button>
                    <Button className = "btn-dark" onClick = {() => navigate("/employee")}> Back </Button>
                </div>
            </div>
            <ReimbTable incomingReimbs = {reimbs}></ReimbTable>
            
        </Container>


    )


}