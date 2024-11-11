package com.revature.services;

import com.revature.daos.ReimbDAO;
import com.revature.daos.UserDAO;
import com.revature.models.Reimb;
import com.revature.models.User;
import com.revature.models.dtos.InReimbDTO;
import com.revature.models.dtos.OutUserDTO;
import com.revature.models.dtos.OutReimbDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReimbService {

    private ReimbDAO rDAO;
    private UserDAO uDAO;

    @Autowired
    public ReimbService(ReimbDAO rDAO, UserDAO uDAO) {
        this.rDAO = rDAO;
        this.uDAO = uDAO;
    }
    public Reimb createReimb(InReimbDTO newReimb) {
        User user = uDAO.findById(newReimb.getUserId()).get();
        Reimb reimb = new Reimb(0, newReimb.getDescription(), newReimb.getAmount(), "Pending", user);
       if (newReimb.getDescription() == null || newReimb.getDescription().isBlank()) {
            throw new IllegalArgumentException("Description can't be empty!");
        } else if (newReimb.getAmount() == 0) {
            throw new IllegalArgumentException("Amount can't be 0!");
        }
        return rDAO.save(reimb);
    }

    private OutReimbDTO convertToDTO(Reimb r) {
        OutUserDTO outDTO = new OutUserDTO(r.getUser().getUserId(), r.getUser().getFirstName(), r.getUser().getLastName(), r.getUser().getUsername(), r.getUser().getTitle());

        return new OutReimbDTO(r.getReimbId(), r.getDescription(), r.getAmount(), r.getUser().getFirstName(), r.getUser().getLastName(), r.getStatus(), outDTO);
    }

    //This method gets all reimbursements
    public List<OutReimbDTO> getAllReimbs() {
        List<Reimb> allReimbs = rDAO.findAll();
        List<OutReimbDTO> allOutReimbDTOS = new ArrayList<OutReimbDTO>();
        for (Reimb r : allReimbs) {
            allOutReimbDTOS.add(convertToDTO(r));
        }
        return allOutReimbDTOS;
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

    public List<OutReimbDTO> getPendingReimbs () {
        List<Reimb> allReimbs = rDAO.findAll();
        List<OutReimbDTO> pendingReimbs = new ArrayList<OutReimbDTO>();
        for (Reimb r : allReimbs) {
            if ("Pending".equals(r.getStatus())) {
                pendingReimbs.add(convertToDTO(r));
            }
        }
        return pendingReimbs;
    }
    public List<Reimb> getPendingReimbById (int userId) {
        List<Reimb> allReimbs = rDAO.findByUserUserId(userId);
        List<Reimb> pendingReimbs = new ArrayList<Reimb>();
        for (Reimb r : allReimbs) {
            if (userId == 0) {
                throw new IllegalArgumentException("User can't be found!");
            }
            else if ("Pending".equals(r.getStatus())) {
                pendingReimbs.add(r);
            }
        }
        return pendingReimbs;
    }

    public Reimb updateDescription(int reimbId, String description) {
        Reimb r = rDAO.findById(reimbId).get();
        r.setDescription(description);
        return rDAO.save(r);
    }
    public Reimb resolveReimb(int reimbsId, String status) {
        Reimb r = rDAO.findById(reimbsId).get();
        r.setStatus(status);
        return rDAO.save(r);
    }

}
