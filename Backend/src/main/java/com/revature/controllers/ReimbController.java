package com.revature.controllers;

import com.revature.models.Reimb;
import com.revature.models.dtos.InReimbDTO;
import com.revature.models.dtos.OutReimbDTO;
import com.revature.services.ReimbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reimbursements")
@CrossOrigin
public class ReimbController {

    @Autowired
    private ReimbService reimbService;

    @PostMapping
    public ResponseEntity<Reimb> createReimb(@RequestBody InReimbDTO newReimb) {
    if (newReimb.getDescription() == null || newReimb.getDescription().isBlank()) {
            throw new IllegalArgumentException("Description can't be empty!");
        } else if (newReimb.getAmount() == 0) {
            throw new IllegalArgumentException("Amount can't be 0!");
        }

        Reimb r = reimbService.createReimb(newReimb);
        return ResponseEntity.status(201).body(r);
    }

    @GetMapping("/all")
    public ResponseEntity<List<OutReimbDTO>> getAllReimbs() {
        List<OutReimbDTO> allReimbs = reimbService.getAllReimbs();
        return ResponseEntity.ok(allReimbs);
    }

    //A method that gets all reimbursements by userId
    @GetMapping("/users/{userId}") // GET request to /reimbursements/users/{userId} will come here
    public ResponseEntity<List<Reimb>> getByUserId(@PathVariable int userId) {


        //Return the list of all reimbursements with a 200 status code
        return ResponseEntity.ok(reimbService.getReimbByUserId(userId));
    }
    @GetMapping("/pending") // GET request to /reimbursements/users/{userId}/pending will come here
    public ResponseEntity<List<Reimb>> getPendingReimbs(){
        return ResponseEntity.ok(reimbService.getPendingReimbs());
    }

    @GetMapping("/pending/{userId}") // GET request to /reimbursements/users/{userId}/pending will come here
    public ResponseEntity<List<Reimb>> getPendingReimbById(@PathVariable int userId){
        return ResponseEntity.ok(reimbService.getPendingReimbById(userId));
    }

//    @PatchMapping("/{reimbId}/description")
//    public ResponseEntity<Reimb> updateDescription(@PathVariable int reimbId, @RequestBody Map<String, String> description) {
//        Reimb r = reimbService.updateDescription(reimbId, description.get(description));
//        return ResponseEntity.ok(r);
//    }

    @PutMapping("/{reimbId}")
    public ResponseEntity<Reimb> resolveReimb(@PathVariable int reimbId, @RequestBody Map<String, String> status) {
        Reimb r = reimbService.resolveReimb(reimbId, status.get("status"));
        return ResponseEntity.ok(r);
    }
}
