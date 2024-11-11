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

            <h3>Employee {store.loggedInUser.firstName} {store.loggedInUser.lastName[0]}</h3>
            <div className = "d-flex justify-content-end">
<<<<<<< HEAD:Frontend/src/Components/Reimb/EmpReimbComponent.tsx
                <div>
                    <Button className = "btn-success m-1" onClick = {() => navigate('/create/reimb')}> Create Reimbursement </Button>
                    <Button className = "btn-dark" onClick = {() => navigate('/employee', {state: {title: 'employee'}})}> Back </Button>
                </div>
=======
                    <Button className = "btn-success m-1" onClick = {() => navigate("/create/employee/reimb")}> Create Reimbursement </Button>
                    <Button className = "btn-dark" onClick = {() => navigate("/employee")}> Back </Button>
>>>>>>> 56ad5f7bea6995182a3fd296fc18b842f3154932:Frontend/src/Components/Reimb/EmployeeAllReimbs.tsx
            </div>
            <h5>Reimbursement(s):</h5>
            <EmployeeReimbTable incomingReimbs = {reimbs}></EmployeeReimbTable>
            
        </Container>


    )


}