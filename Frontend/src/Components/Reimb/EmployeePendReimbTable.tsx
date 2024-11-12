
import axios from "axios";
import { Button, Container, Form, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { store } from "../../globalData/store";

export const EmployeePendReimbTable: React.FC<{ incomingReimbs: any[] }> = ({ incomingReimbs }) => {
    const [childReimbs, setChildReimbs] = useState<any[]>(incomingReimbs);
    const [descriptions, setDescriptions] = useState<{ [key: string]: string }>({});
    const [descMsgs, setDescMsgs] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        getReimbs();
    }, []);

    const getReimbs = async () => {
        try {
            const response = await axios.get(
                `${store.baseUrl}/reimbursements/pending/${store.loggedInUser.userId}`
            );
            setChildReimbs(response.data);
        } catch (error) {
            alert("Failed to fetch reimbursements!");
            console.error("Error fetching reimbursements:", error);
        }
    };

    const validateFields = (reimbId: string) => {
        let isValid = true;

        if (!descriptions[reimbId]?.trim()) {
            setDescMsgs((prev) => ({ ...prev, [reimbId]: "New description is required!" }));
            isValid = false;
        } else {
            setDescMsgs((prev) => ({ ...prev, [reimbId]: "" }));
        }

        return isValid;
    };

    const updateReimb = async (reimb: any) => {
        const isValid = validateFields(reimb.reimbId);

        if (!isValid) {
            return;
        }

        try {
            const newDescription = descriptions[reimb.reimbId] || reimb.description;

            // Use the correct endpoint for updating description
            await axios.patch(
                `${store.baseUrl}/reimbursements/${reimb.reimbId}/description`,
                { description: newDescription },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            alert(`Description for reimbursement ID ${reimb.reimbId} has been updated!`);
            getReimbs(); // Refresh the table
        } catch (error) {
            alert("Failed to update reimbursement!");
            console.error("Error updating reimbursement:", error);
        }
    };

    return (
        <Container className="my-5 mx-auto">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Reimbursement ID</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {childReimbs.map((reimb: any) => (
                        <tr key={reimb.reimbId}>
                            <td>{reimb.reimbId}</td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="New Description"
                                    value={descriptions[reimb.reimbId] || reimb.description}
                                    onChange={(e) =>
                                        setDescriptions((prev) => ({
                                            ...prev,
                                            [reimb.reimbId]: e.target.value,
                                        }))
                                    }
                                />
                                {descMsgs[reimb.reimbId] && (
                                    <li style={{ marginLeft: "1%", color: "red" }}>
                                        {descMsgs[reimb.reimbId]}
                                    </li>
                                )}
                            </td>
                            <td>{reimb.amount}</td>
                            <td>{reimb.status}</td>
                            <td>
                                <Button
                                    className="btn-info"
                                    onClick={() => {
                                        updateReimb(reimb);
                                    }}
                                >
                                    Update
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};
