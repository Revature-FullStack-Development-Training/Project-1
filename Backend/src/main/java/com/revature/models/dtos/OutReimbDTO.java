package com.revature.models.dtos;

public class OutReimbDTO {

    private int reimbId;
    private String description;
    private double amount;
    private String firstName;
    private String lastName;
    private String status;
    private OutUserDTO OutUserDTO;

    public OutReimbDTO() {
    }

    public OutReimbDTO(int reimbId, String description, double amount, String firstName, String lastName, String status,
                       OutUserDTO OutUserDTO) {
        this.reimbId = reimbId;
        this.description = description;
        this.amount = amount;
        this.firstName = firstName;
        this.lastName = lastName;
        this.status = status;
        this.OutUserDTO = OutUserDTO;
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

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public OutUserDTO getOutUserDTO() {
        return OutUserDTO;
    }

    public void setOutUserDTO(OutUserDTO OutUserDTO) {
        this.OutUserDTO = OutUserDTO;
    }

    @Override
    public String toString() {
        return "OutReimbDTO{" +
                "reimbId=" + reimbId +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", status='" + status + '\'' +
                ", OutUserDTO=" + OutUserDTO +
                '}';
    }
}
