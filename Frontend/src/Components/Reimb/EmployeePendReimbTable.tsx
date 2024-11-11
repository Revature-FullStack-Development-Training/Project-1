// This component take in the Pets array as props from the PetContainer

import axios from "axios"
import { Button, Container, Form, Modal, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { store } from "../../globalData/store"
import { useEffect, useState } from "react"

// We'll call this Pets array "pets"
export const EmployeePendReimbTable:React.FC<{incomingReimbs: any[]}> = ({incomingReimbs}) => {

    const [childReimbs, setChildReimbs] = useState<any[]>(incomingReimbs)

    const navigate = useNavigate()

    useEffect(() => {
        getReimbs()
    }, [])

    
    // Hypothetical methods for update and delete pet (which both need pet ID to the pet in question)
    const updateReimb = async (reimb: any) => {

    }

    const getReimbs = async () => {
        // axios GET request
        const response = await axios.get(store.baseUrl + "/reimbursements/pending/" + store.loggedInUser.userId)
        .then(
            (response) => {
                // Populate the reimbs state object
                setChildReimbs(response.data) // data holds the data sent in the response body
            })
        .catch((error) => {alert("Fetching reimbs failed!")})
    }

    return(
        <Container className = "my-5 mx-auto">
            <Table>
                <thead>
                    <tr>
                        <th> Reimbursement ID </th>
                        <th> Description </th>
                        <th> Amount </th>
                        <th> Status </th>
                    </tr>
                </thead>
                <tbody>
                    {childReimbs.map((reimb: any) => (
                        <tr>
                            <td> {reimb.reimbId} </td>
                            <td> {reimb.description} </td>
                            <td> {reimb.amount} </td>
                            <td> {reimb.status} </td>
                            <td>
                                <Button className = "btn-info" onClick = {() => {updateReimb(reimb)}}>Update</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}