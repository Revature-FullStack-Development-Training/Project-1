import { Button, Container } from "react-bootstrap"
import { EmployeeTable } from "./EmployeeTable"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { store } from "../../globalData/store"

export const Employees:React.FC = () => {

    // TODO: we could have a useEffect that checks the user's role and redirects them back to the login component if they aren't admins

    const [employees, setEmployees] = useState([])

    const navigate = useNavigate()
    
    useEffect(() => {
        getEmployees()
    }, [])

    const getEmployees = async () => {
        // axios GET request
        const response = await axios.get(store.baseUrl + "/users")
        .then(
            (response) => {
                // Populate the reimbs state object
                setEmployees(response.data) // data holds the data sent in the response body
            })
        .catch((error) => {alert("Fetching employees failed!")})
    }

    return(
        <Container className = "my-5 mx-auto">
            <h3> Manager {store.loggedInUser.firstName} {store.loggedInUser.lastName[0]} </h3>
            <div className = "d-flex justify-content-end">
                <Button className = "btn-dark" onClick = {() => navigate("/manager")}> Back </Button>
            </div>
            <h5> Employee(s): </h5>
            <EmployeeTable incomingEmployees = {employees}></EmployeeTable>
        </Container>
    )
}