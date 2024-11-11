import axios from "axios"
import { Button, Container, Table } from "react-bootstrap"
import { store } from "../../globalData/store"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export const EmployeeTable:React.FC<{incomingEmployees: any[]}> = ({incomingEmployees}) => {
    
    const [childEmployees, setChildEmployees] = useState<any[]>(incomingEmployees)

    useEffect(() => {
        getEmployees()
    }, [])

    const navigate = useNavigate()
    
    const updateEmployeeTitle = async (employee: any) => {
        if (employee.title === "Employee") {
            const response = await axios.patch(store.baseUrl + "/users/" + employee.username, "Manager", {
                headers: {
                'Content-Type': 'text/plain', // Indicate that we're sending plain text
                }})
            .then(() => {alert("Employee " + employee.firstName + " " + employee.lastName[0] + ". has been promoted!")})
            .then(() => {getEmployees()})
            .catch((error) => {alert("Promotion failed!")})

        } else if (employee.title === "Manager") {
            const response = await axios.patch(store.baseUrl + "/users/" + employee.username, "Employee", {
                headers: {
                'Content-Type': 'text/plain', // Indicate that we're sending plain text
                }})
            .then(() => {alert("Manager " + employee.firstName + " " + employee.lastName[0] + ". has been demoted!")})
            .then(() => {getEmployees()})
            .catch((error) => {alert("Demotion failed!")})
        }
    }

    const deleteEmployee = async (employee: any) => {
        const response = await axios.delete(store.baseUrl + "/users/" + employee.username)
        .then(() => {alert("Employee " + employee.firstName + " " + employee.lastName[0] + ". has been deleted!")})
        .then(() => {getEmployees()})
        .catch((error) => {alert("Deletion failed!")})
    }

    const getEmployees = async () => {
        // axios GET request
        const response = await axios.get(store.baseUrl + "/users")
        .then(
            (response) => {
                // Populate the reimbs state object
                setChildEmployees(response.data) // data holds the data sent in the response body
            })
        .catch((error) => {alert("Fetching employees failed!")})
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
                    {childEmployees.map((employee: any) => (
                        <tr>
                            <td> {employee.userId} </td>
                            <td> {employee.firstName} </td>
                            <td> {employee.lastName} </td>
                            <td> {employee.username} </td>
                            <td> {employee.title} </td>
                            <td>
                                <Button className = "btn-info" onClick = {() => {updateEmployeeTitle(employee)}}>Update Title</Button>
                                <Button className = "btn-danger" onClick = {() => {deleteEmployee(employee)}}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

