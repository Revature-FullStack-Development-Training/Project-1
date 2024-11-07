package com.revature.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import javax.validation.constraints.Min;

@Component // This class wil be registered as a Spring Bean
@Entity // This class will be created as a table in the DB
@Table(name = "reimbs") // Sets properties like table name.
public class Reimb {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reimbId;

    private String description;

    @Min(value = 1, message = "Amount must be greater than 0.")
    @Column(nullable = false)
    private double amount;

    @Column(nullable = false)
    private String status = "PENDING";

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id_fk")
    @JsonIgnore
    private User user;

    public Reimb() {
    }

    public Reimb(int reimbId, String description, double amount, String status,
                 User user) {
        this.reimbId = reimbId;
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.user = user;
    }

    public int getReimbId() {
        return reimbId;
    }

    public void setReimbId(int reimbId) {
        this.reimbId = reimbId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Min(value = 1, message = "Amount must be greater than 0.")
    public double getAmount() {
        return amount;
    }

    public void setAmount(@Min(value = 1, message = "Amount must be greater than 0.") double amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Reimb{" +
                "reimbId=" + reimbId +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                ", user=" + user +
                '}';
    }
}
