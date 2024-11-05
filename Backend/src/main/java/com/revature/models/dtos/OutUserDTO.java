package com.revature.models.dtos;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class OutUserDTO {

    private int userId;

    private String username;

    private String first_name;

    private String last_name;

    private String title;

    public OutUserDTO() {
    }

    public OutUserDTO(int userId, String username, String first_name, String last_name,
                      String title) {
        this.userId = userId;
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.title = title;
    }

    public int getUser_id() {
        return userId;
    }

    public void setUser_id(int user_id) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "OutUserDTO{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", title='" + title + '\'' +
                '}';
    }
}
