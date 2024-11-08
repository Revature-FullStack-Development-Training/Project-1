package com.revature.controllers;

import com.revature.models.dtos.LoginDTO;
import com.revature.models.dtos.OutUserDTO;
import com.revature.services.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    //authorize the service
    AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    //create a session
    //uninitialized HttpSession (filled upon successful login)
    public static HttpSession session;

    //Note: our HTTP Session is coming in via parameters this time (to be sent to to controller)
    @PostMapping
    public ResponseEntity<OutUserDTO> login (@RequestBody LoginDTO lDTO, HttpSession session) {

        //send LoginDTO to service, getting us the OutUser
        OutUserDTO oDTO = authService.login(lDTO, session);

        //the session gets initialized and filled with user data in the service layer

        //if we get here, login was successful and session was created
        return ResponseEntity.ok(oDTO);
    }
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException e) {
        return ResponseEntity.status(400).body(e.getMessage());
    }
}
