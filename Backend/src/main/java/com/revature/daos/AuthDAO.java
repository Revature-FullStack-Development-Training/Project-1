package com.revature.daos;

import com.revature.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthDAO extends JpaRepository<User, Integer> {

    User findByUsernameAndPassword(String username, String password);
}
