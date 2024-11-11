import axios from "axios"
import { useEffect, useState } from "react"
import { store } from "../../globalData/store"
import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { EmployeeReimbTable } from "./EmployeeReimbTable"

export const EmployeeAllReimbs:React.FC = () => {

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

            <h3>Employee {store.loggedInUser.firstName} {store.loggedInUser.lastName[0]}.</h3>
            <div className = "d-flex justify-content-end">
                    <Button className = "btn-success m-1" onClick = {() => navigate("/create/employee/reimb")}> Create Reimbursement </Button>
                    <Button className = "btn-dark" onClick = {() => navigate("/employee")}> Back </Button>
            </div>
            <h5>Reimbursement(s):</h5>
            <EmployeeReimbTable incomingReimbs = {reimbs}></EmployeeReimbTable>
            
        </Container>


    )


}