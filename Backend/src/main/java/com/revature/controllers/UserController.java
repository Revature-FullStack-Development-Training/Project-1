package com.revature.controllers;

import com.revature.daos.UserDAO;
import com.revature.models.dtos.OutUserDTO;
import com.revature.models.User;
import com.revature.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;
    private UserDAO uDAO;

    @Autowired
    public UserController(UserService userService, UserDAO uDAO){
        this.userService = userService;
        this.uDAO = uDAO;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User newUser) {
        User u = userService.createUser(newUser);
        return ResponseEntity.status(201).body(u);
    }

    @GetMapping
    public ResponseEntity<List<OutUserDTO>> getAllUsers() {

        List<OutUserDTO> allUsers = userService.getAllUsers();

        return ResponseEntity.ok(allUsers);
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<User> deleteUser(@PathVariable String username) {

        User userToDelete = uDAO.findByUsername(username);

        userService.deleteUser(username);
        return ResponseEntity.ok(userToDelete);
    }


    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException e) {
        return ResponseEntity.status(400).body(e.getMessage());
    }
}
