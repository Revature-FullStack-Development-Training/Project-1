// This component take in the Pets array as props from the PetContainer

import { Button, Container, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

// We'll call this Pets array "pets"
export const EmployeeReimbTable:React.FC<{incomingReimbs: any[]}> = ({incomingReimbs}) => {

    const navigate = useNavigate()

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
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}