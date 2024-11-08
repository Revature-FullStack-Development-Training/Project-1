package com.revature.models.dtos;

public class InReimbDTO {

    private String description;
    private double amount;
    private int userId;

    public InReimbDTO() {
        super();
    }

    public InReimbDTO(String description, double amount, int userId) {
        this.description = description;
        this.amount = amount;
        this.userId = userId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "InReimbDTO [description=" + description + ", amount=" + amount + ", UserId=" + userId + "]";
    }
}
