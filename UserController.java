package com.acadzen.acadzen.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
// import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.multipart.MultipartFile;

import com.acadzen.acadzen.Entity.UserEntity;
import com.acadzen.acadzen.Repository.UserRepository;
import com.acadzen.acadzen.Service.UserService;


@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    @Autowired
    UserService userv;

    @Autowired
    UserRepository urepo;

    //C - Create and Insert
    @PostMapping("/insertUser")
    public UserEntity insertUser(@RequestBody UserEntity user){
        return userv.insertUser(user);
    }

    //R -Read
    @GetMapping("/getAllUser")
    public List<UserEntity> getAllUser(){
        return userv.getAllUser();
    }


    //U - Update
    @PutMapping("/update/{userno}")
    public UserEntity updateUser(@PathVariable int userno, @RequestBody UserEntity newUserDetails){
        return userv.updateUser(userno, newUserDetails);
    }

    //D - Delete
    @PutMapping("/delete/{userno}")
    public ResponseEntity<java.util.Map<String, String>> deleteUser(@PathVariable int userno){
        java.util.Map<String, String> response = new HashMap<>();
        Optional<UserEntity> userOptional = urepo.findById(userno);
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            user.setDeleted(true); // Set isDeleted to true instead of deleting the record
            urepo.save(user); // Save the updated user record
            response.put("message", "User " + userno + " is successfully deleted");
        }
        else{
            response.put("message", "User " + userno + " does not exist");
        }
        return ResponseEntity.ok(response);
    }

    // Update the method signature
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody UserEntity request) {
        String username = request.getUsername();
        String password = request.getPassword();

        // Your authentication logic here
        boolean isAuthenticated = userv.authenticateUser(username, password);

        if (isAuthenticated) {
            UserEntity userDetails = userv.getUserDetails(username);
            return ResponseEntity.ok(userDetails);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
    // @PostMapping("/login")
    // public ResponseEntity<String> authenticateUser(@RequestBody UserEntity request) {
    //     String username = request.getUsername();
    //     String password = request.getPassword();

    //     // Your authentication logic here
    //     boolean isAuthenticated = userv.authenticateUser(username, password);

    //     if (isAuthenticated) {
    //         return ResponseEntity.ok("Login successful");
    //     } else {
    //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    //     }
    // }

    @PostMapping("/getUserDetails")
    public ResponseEntity<UserEntity> getUserDetails(@RequestBody UserEntity request) {
        String username = request.getUsername();

        UserEntity userDetails = userv.getUserDetails(username);
        if (userDetails != null) {
            return ResponseEntity.ok(userDetails);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    
    // Storing Images
    // @PostMapping("/uploadImage/{userno}")
    // public ResponseEntity<?> uploadImage(@PathVariable int userno, @RequestParam("image") MultipartFile image) {
    //     try {
    //         userv.uploadImage(userno, image);
    //         return ResponseEntity.ok("Image uploaded successfully");
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed");
    //     }
    // }

    // @GetMapping("/getImage/{userno}")
    // public ResponseEntity<?> getImage(@PathVariable int userno) {
    //     try {
    //         byte[] image = userv.getImage(userno);
    //         return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Image not found");
    //     }
    // }

}
