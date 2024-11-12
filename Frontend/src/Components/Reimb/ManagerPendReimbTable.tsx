// This component take in the Pets array as props from the PetContainer

import axios from "axios"
import { Button, Container, Table } from "react-bootstrap"
import { store } from "../../globalData/store"
import { useEffect, useState } from "react"

// We'll call this Pets array "pets"
export const ManagerPendReimbTable:React.FC<{incomingReimbs: any[]}> = ({incomingReimbs}) => {

    const [childReimbs, setChildReimbs] = useState<any[]>(incomingReimbs)

    useEffect(() => {
        getReimbs()
    }, [])

    
    // Hypothetical methods for update and delete pet (which both need pet ID to the pet in question)
    const approveReimb = async (reimb: any) => {
        const response = await axios.patch(store.baseUrl + "/reimbursements/" + reimb.reimbId, "Approved", {
            headers: {
            'Content-Type': 'text/plain', // Indicate that we're sending plain text
            }})
        .then(() => {alert("Reimbursement with ID " + reimb.reimbId + " has been approved!")})
        .then(() => {getReimbs()})
        .catch((error) => {alert("Approval failed!")})
    }

    const denyReimb = async (reimb: any) => {
        const response = await axios.patch(store.baseUrl + "/reimbursements/" + reimb.reimbId, "Denied", {
            headers: {
            'Content-Type': 'text/plain', // Indicate that we're sending plain text
            }})
        .then(() => {alert("Reimbursement with ID " + reimb.reimbId + " has been denied!")})
        .then(() => {getReimbs()})
        .catch((error) => {alert("Denial failed!")})
    }

    const getReimbs = async () => {
        // axios GET request
        const response = await axios.get(store.baseUrl + "/reimbursements/pending")
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
                        <th> First Name</th>
                        <th> Last Name</th>
                        <th> Status </th>
                    </tr>
                </thead>
                <tbody>
                    {childReimbs.map((reimb: any) => (
                        <tr>
                            <td> {reimb.reimbId} </td>
                            <td> {reimb.description} </td>
                            <td> {reimb.amount} </td>
                            <td> {reimb.firstName} </td>
                            <td> {reimb.lastName} </td>
                            <td> {reimb.status} </td>
                            <td>
                                <Button className = "btn-info" onClick = {() => {approveReimb(reimb)}}>Approve</Button>
                                <Button className = "btn-danger" onClick = {() => {denyReimb(reimb)}}>Deny</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}