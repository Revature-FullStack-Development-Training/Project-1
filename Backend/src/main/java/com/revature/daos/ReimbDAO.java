package com.revature.daos;

import com.revature.models.Reimb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReimbDAO extends JpaRepository<Reimb, Integer> {

    //finda all reimbursements by userId
    //This custom method will need to look at the User object's userId in Reimb

    public List<Reimb> findByUserUserId(int userId);

    //This property expression tells Spring to dig into the User object and find the userId
}
