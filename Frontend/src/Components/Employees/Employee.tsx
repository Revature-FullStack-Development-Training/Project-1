import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"

export const Employee:React.FC = () => {

    const navigate = useNavigate()

    return(
        <Container className = "my-5 mx-auto">
            <h3> Employee {store.loggedInUser.firstName} {store.loggedInUser.lastName[0]}. </h3>

            <div>
                <Button className = "btn-dark" onClick = {() => navigate("/employee/reimbs")}> Reimbursement(s) </Button>
                <Button className = "btn-dark" onClick = {() => navigate("/employee/pendreimbs")}> Pending Reimbursement(s) </Button>
                <Button className = "btn-dark" onClick = {() => navigate("/")}> Back </Button>
            </div>
        </Container>
    )
}