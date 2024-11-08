package com.revature.services;

import com.revature.controllers.AuthController;
import com.revature.daos.AuthDAO;
import com.revature.models.User;
import com.revature.models.dtos.LoginDTO;
import com.revature.models.dtos.OutUserDTO;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private AuthDAO authDAO;
    @Autowired
    public AuthService(AuthDAO aDAO) {
        this.authDAO = aDAO;
    }

    //
    public OutUserDTO login(LoginDTO lDTO, HttpSession session) {

        //Use the DTO data to find the user in the database (through DAO)
        User u = authDAO.findByUsernameAndPassword(lDTO.getUsername(), lDTO.getPassword());

        //If no user is found, throw an exception
        if (u == null) {
            throw new IllegalArgumentException("Invalid credentials");
        }
        //If a user is found, login is successful and we create a session
        //Remember we're usingthe session from the controller
        AuthController.session = session;

        //Store the user's data in the session
        session.setAttribute("userId", u.getUserId());
        session.setAttribute("username", u.getUsername());
        session.setAttribute("firstName", u.getFirstName());
        session.setAttribute("lastName", u.getLastName());
        session.setAttribute("title", u.getTitle());


        //Process the User into an OutUserDTO
        return new OutUserDTO(u.getUserId(), u.getFirstName(), u.getLastName(), u.getUsername(), u.getTitle());
    }
}
