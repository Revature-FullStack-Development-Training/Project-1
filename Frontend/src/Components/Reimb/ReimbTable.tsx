// This component take in the Pets array as props from the PetContainer

import { Button, Container, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

// We'll call this Pets array "pets"
export const ReimbTable:React.FC<{incomingReimbs: any[]}> = ({incomingReimbs}) => {

    const navigate = useNavigate()
    
    // Hypothetical methods for update and delete pet (which both need pet ID to the pet in question)
    const updateReimb = (id: number) => {
        alert("Reimbursement with ID " + id + " has been updated")
    }

    const deleteReimb = (id: number) => {
        alert("Reimbursement with ID " + id + " has been deleted (not really)")
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
                    {incomingReimbs.map((reimb: any) => (
                        <tr>
                            <td> {reimb.reimbId} </td>
                            <td> {reimb.description} </td>
                            <td> {reimb.amount} </td>
                            <td> {reimb.status} </td>
                            <td>
                                <Button className = "btn-info" onClick = { () => {updateReimb(reimb.reimbId)}}>Update</Button>
                                <Button className = "btn-danger" onClick = {() => {deleteReimb(reimb.reimbId)}}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}