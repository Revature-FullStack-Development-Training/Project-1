import { Button, Container, Table } from "react-bootstrap"

export const EmployeeTable:React.FC<{incomingEmployees: any[]}> = ({incomingEmployees}) => {
    
    const updateEmployee = (id: number) => {
        alert("Employee with ID " + id + " has been updated")
    }

    const deleteEmployee = (id: number) => {
        alert("Employee with ID " + id + " has been deleted (not really)")
    }

    return(
        <Container className = "my-5 mx-auto">
            <Table>
                <thead>
                    <tr>
                        <th> Employee ID </th>
                        <th> First Name </th>
                        <th> Last Name </th>
                        <th> Username </th>
                        <th> Title </th>
                    </tr>
                </thead>
                <tbody>
                    {incomingEmployees.map((employee: any) => (
                        <tr>
                            <td> {employee.userId} </td>
                            <td> {employee.firstName} </td>
                            <td> {employee.lastName} </td>
                            <td> {employee.username} </td>
                            <td> {employee.title} </td>
                            <td>
                                <Button className = "btn-info" onClick = { () => {updateEmployee(employee.userId)}}>Update Title</Button>
                                <Button className = "btn-danger" onClick = {() => {deleteEmployee(employee.userId)}}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

