import axios from "axios"
import { useEffect, useState } from "react"
import { store } from "../../globalData/store"
import { Button, Container } from "react-bootstrap"
import { ReimbTable } from "./ReimbTable"
import { useNavigate } from "react-router-dom"

export const AllReimbs:React.FC = () => {

    const [reimbs, setReimbs] = useState([])
    
    useEffect(() => {
        getReimbs()
    }, [])

    const navigate = useNavigate()

    const getReimbs = async () => {
        // axios GET request
        const response = await axios.get(store.baseUrl + "/reimbursements/all")
        .then(
            (response) => {
                // Populate the reimbs state object
                setReimbs(response.data) // data holds the data sent in the response body
            })
        .catch((error) => {alert("Fetching reimbs failed!")})
    }

    return(
        <Container className = "my-5 mx-auto">
            <h3> Reimbursement(s): </h3>
            <div className = "d-flex justify-content-end">
                <div>
                    <Button className = "btn-success m-1" onClick = {() => navigate("/create/reimb")}> Create Reimbursement </Button>
                    <Button className = "btn-dark" onClick = {() => navigate("/manager")}> Back </Button>
                </div>
            </div>
            <ReimbTable incomingReimbs = {reimbs}></ReimbTable>
        </Container>
    )
}