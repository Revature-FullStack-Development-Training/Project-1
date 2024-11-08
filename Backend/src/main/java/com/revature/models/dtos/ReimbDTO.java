package com.revature.models.dtos;

public class ReimbDTO {

    private int reimbId;
    private String description;

    private double amount;

    private String status;

    private OutUserDTO OutUserDTO;

    public ReimbDTO() {
    }

    public ReimbDTO(int reimbId, String description, double amount, String status,
                    OutUserDTO OutUserDTO) {
        this.reimbId = reimbId;
        this.description = description;
        this.amount = amount;
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
        return "ReimbDTO{" +
                "reimbId=" + reimbId +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                ", OutUserDTO=" + OutUserDTO +
                '}';
    }
}
