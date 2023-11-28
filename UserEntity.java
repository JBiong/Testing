package com.acadzen.acadzen.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
// import javax.persistence.Lob;

@Entity
@Table(name = "tbluser")
public class UserEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userno;

    private String username;

    private String password;

    private String email;

    private boolean isDeleted = false; // Add this line

    // @Lob
    // private byte[] profilePicture;

    public UserEntity() {
        super();
    }

    public UserEntity(int userno, String username, String password, String email, boolean isDeleted) {
        // , byte[] profilePicture
        this.userno = userno;
        this.username = username;
        this.password = password;
        this.email = email;
        this.isDeleted = isDeleted;
        // this.profilePicture = profilePicture;
    }

    public int getUserno() {
        return userno;
    }

    public void setUserno(int userno) {
        this.userno = userno;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }

    // public byte[] getProfilePicture() {
    //     return profilePicture;
    // }

    // public void setProfilePicture(byte[] profilePicture) {
    //     this.profilePicture = profilePicture;
    // }

    
}
