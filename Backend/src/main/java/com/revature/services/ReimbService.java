package com.revature.services;

import com.revature.daos.ReimbDAO;
import com.revature.models.Reimb;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReimbService {

    private ReimbDAO rDAO;

    @Autowired
    public ReimbService(ReimbDAO rDAO) {
        this.rDAO = rDAO;
    }

    public Reimb createReimb(Reimb newReimb) {

        if((newReimb.getUser()) == null) {
            throw new IllegalArgumentException("User can't be empty!");
        } else if (newReimb.getDescription() == null || newReimb.getDescription().isBlank()) {
            throw new IllegalArgumentException("Description can't be empty!");
        } else if (newReimb.getAmount() == 0) {
            throw new IllegalArgumentException("Amount can't be 0!");
        }
        return rDAO.save(newReimb);
    }

    //This method gets all reimbursements
    public List<Reimb> getAllReimbs() {
        return rDAO.findAll();
    }

    //This method gets all reimbursements by userId
    public List<Reimb> getReimbByUserId(int userId) {

        //Call the ReimbService method to get all reimbursements by userId
        List<Reimb> allReimbs = rDAO.findByUserUserId(userId);

        if (userId == 0) {
            throw new IllegalArgumentException("User can't be found!");
        } else if (allReimbs.size() == 0) {
            throw new IllegalArgumentException("No reimbursements found for this user");
        } else {
            return rDAO.findByUserUserId(userId);
        }
    }

    public List<Reimb> getPendingReimbs () {
        List<Reimb> allReimb = rDAO.findAll();
        List<Reimb> pendingReimb = new ArrayList<Reimb>();
        for (Reimb r : allReimb) {
            if ("PENDING".equals(r.getStatus())) {
                pendingReimb.add(r);
            }
        }
        return pendingReimb;
    }

    public Reimb resolveReimb(int reimbId, String status) {
        Reimb r = rDAO.findById(reimbId).get();
        r.setStatus(status);
        return rDAO.save(r);
    }


}
