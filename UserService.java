package com.acadzen.acadzen.Service;


// import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
// import org.springframework.web.multipart.MultipartFile;

import com.acadzen.acadzen.Entity.UserEntity;
import com.acadzen.acadzen.Repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    UserRepository urepo;

    // C
    public UserEntity insertUser(UserEntity user){
        return urepo.save(user);
    }

    //R -Read
    public List<UserEntity> getAllUser(){
        return urepo.findAll().stream().filter(user -> !user.isDeleted()).collect(Collectors.toList());
    }

    //U
    @SuppressWarnings("finally")
    public UserEntity updateUser(int userno, UserEntity newUserDetails){
        UserEntity user = new UserEntity();
        try{
            // 1. Search the id number of the user that will be updated
            user = urepo.findById(userno).get();

            // 2. Update
            user.setUsername(newUserDetails.getUsername());
            user.setPassword(newUserDetails.getPassword());
            user.setEmail(newUserDetails.getEmail());
        }
        catch(NoSuchElementException e){
            throw new NoSuchElementException("User " + userno + " does not exist!");
        }
        finally {
            return urepo.save(user);
        }
    }

    //D - Delete
    public String deleteUser(int userno){
        String msg = "";

        Optional<UserEntity> userOptional = urepo.findById(userno);
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            user.setDeleted(true); // Set isDeleted to true instead of deleting the record
            urepo.save(user); // Save the updated user record
            msg = "User " + userno + " is successfully deleted";
        }
        else{
            msg = "User " + userno + " does not exist";
        }
        return msg;
    }

    // New method for authentication
    public boolean authenticateUser(String username, String password) {
        UserEntity user = urepo.findByUsernameAndPassword(username, password);
        return user != null; // Return true if user is found, indicating successful authentication
    }

    public UserEntity getUserDetails(String username) {
        return urepo.findByUsername(username);
    }
    
    // Store Images
    // public void uploadImage(int userno, MultipartFile image) throws IOException {
    // UserEntity user = urepo.findById(userno).orElseThrow(() -> new NoSuchElementException("User not found"));
    // user.setProfilePicture(image.getBytes());
    // urepo.save(user);
    // }

    // public byte[] getImage(int userno) {
    //     UserEntity user = urepo.findById(userno).orElseThrow(() -> new NoSuchElementException("User not found"));
    //     return user.getProfilePicture();
    // }

}
