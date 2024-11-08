import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Login:React.FC = () => {

    // We need a useNavigate hook to navigate between components programatically, which means we don't have to manually switch the URL
    const navigate = useNavigate();

    return(
    
        // Botstrap gives us this wrapper component element that does some default pading and centering
        <Container>
            <h3>Login Component</h3>

            <button>Login</button>
            <button onClick = {() => navigate("/register/employee")}> Register Employee </button>
            <button onClick = {() => navigate("/create/reimb")}> Create Reimbursement </button>
        </Container>
    )
}