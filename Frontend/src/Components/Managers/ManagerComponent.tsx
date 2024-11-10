import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"
import { useState } from "react"

export const ManagerComponent:React.FC = () => {

    const [manager, setManager] = useState()

    const navigate = useNavigate()

    return(
        <Container className = "my-5 mx-auto">
            <h3> Manager {store.loggedInUser.firstName} {store.loggedInUser.lastName[0]} </h3>

            <div>
                <Button className = "btn-dark" onClick = {() => navigate("/employees")}> Employee(s) </Button>
                <Button className = "btn-dark" onClick = {() => navigate("/reimbs")}> Reimbursement(s) </Button>
                <Button className = "btn-dark" onClick = {() => navigate("/")}> Back </Button>
            </div>
        </Container>
    )
}