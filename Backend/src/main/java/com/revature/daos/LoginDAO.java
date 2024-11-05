package com.revature.daos;

import com.revature.models.User;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginDAO {

    User findByUsernameAndPassword(String username, String password);
}
