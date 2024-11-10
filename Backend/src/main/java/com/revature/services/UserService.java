package com.revature.services;

import com.revature.daos.UserDAO;
import com.revature.models.dtos.OutUserDTO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private UserDAO uDAO;

    @Autowired
    public UserService(UserDAO uDAO) {
        this.uDAO = uDAO;
    }

    public User createUser(User newUser) {

        if (newUser.getUsername() == null || newUser.getUsername().isBlank()) {
            throw new IllegalArgumentException("Username can't be empty!");
        }
        else if (newUser.getPassword() == null || newUser.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password can't be empty!");
        }
        else if (newUser.getFirstName() == null || newUser.getFirstName().isBlank()) {
            throw new IllegalArgumentException("First name can't be empty!");
        }
        else if (newUser.getLastName() == null || newUser.getLastName().isBlank()) {
            throw new IllegalArgumentException("Last name can't be empty!");
        }
        return uDAO.save(newUser);
    }

    public List<OutUserDTO> getAllUsers() {
        List<User> users = uDAO.findAll();

        List<OutUserDTO> outUsers = new ArrayList<OutUserDTO>();

        for(User u : users) {
            outUsers.add(new OutUserDTO(u.getUserId(), u.getFirstName(), u.getLastName(),
                    u.getUsername(), u.getTitle()));
        }

        return outUsers;
    }

    public User updateUserTitle(String username, String newTitle) {

        User userToUpdate = uDAO.findByUsername(username);
        if (userToUpdate == null) {
            throw new IllegalArgumentException("No user found with username: " +
                    username);
        }
        userToUpdate.setTitle(newTitle);
        uDAO.save(userToUpdate);
        return userToUpdate;
    }

    public void deleteUser(String username) {

        User userToDelete = uDAO.findByUsername(username);

        if (userToDelete == null) {
            throw new IllegalArgumentException("User can't be found!");
        }
        else {
            uDAO.delete(userToDelete);
        }
    }
}
