package com.acadzen.acadzen.Service;


import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    //R
    public List<UserEntity> getAllUser(){
        return urepo.findAll();
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

    //D
    public String deleteUser(int userno){
        String msg = "";

        if (urepo.findById(userno) != null) {
            urepo.deleteById(userno);
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
    
}
