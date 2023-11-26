// Profile.js
import React, { useEffect, useState } from "react";
import { Box, Button, MenuItem, Select, TextField, TextareaAutosize, Toolbar, Typography } from "@mui/material";
import "./Profile.css";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GradingIcon from '@mui/icons-material/Grading';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import SpaIcon from '@mui/icons-material/Spa';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation } from "react-router-dom";

const ProfileSettings = () => {
  const location = useLocation();

  const [editingUsername, setEditingUsername] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility

  const [overviewClicked, setOverviewClicked] = useState(false);
  const [documentClicked, setDocumentClicked] = useState(false);
  const [dreamboardClicked, setDreamboardClicked] = useState(false);
  const [mentalHealthClicked, setMentalHealthClicked] = useState(false);
  const [pricingClicked, setPricingClicked] = useState(false);
  const [settingClicked, setSettingClicked] = useState(false);
  const [contactUsClicked, setContactUsClicked] = useState(false);

  const userno = localStorage.getItem('userno');
  const npassword = localStorage.getItem('password');
  const [newUsername, setNewUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("") // Use the entered password

  // Add a new state for username
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")

  useEffect(() => {
    // Check if the current location is /dashboard and set the Overview button state accordingly
    setOverviewClicked(location.pathname === "/dashboard");
    setDocumentClicked(location.pathname === "/uploaddocument");
    setDreamboardClicked(location.pathname === "/dreamboard");
    setMentalHealthClicked(location.pathname === "/mentalhealth");
    setPricingClicked(location.pathname === "/pricing");
    setSettingClicked(location.pathname === "/profilesettings")
    setContactUsClicked(location.pathname === "/contactus");

    const newUsername = 'newUsername'; // Replace with the new username
    const newPassword = 'newPassword'; 
    const storedUserNo = localStorage.getItem('userno');
    console.log(storedUserNo); // Use this userno as needed

    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || "Guest");

    // Retrieve password from localStorage
    const storedPassword = localStorage.getItem('password');
    setPassword(storedPassword);
    console.log(storedPassword);
  }, [location.pathname]);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Set the selected image for display
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  
  // Update both username and password
const updateProfile = (newUsername, newPassword) => {
  // const userno = localStorage.getItem('userno'); // Get the userno from localStorage
  fetch(`http://localhost:8080/api/user/update/${userno}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: newUsername,
      password: newPassword,
      // Include other user details if necessary
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setUsername(newUsername); // Update the username state
      setPassword(newPassword); // Update the password state
      localStorage.setItem('username', newUsername);
      localStorage.setItem('password', newPassword);
    })
    .catch((error) => console.error('Error:', error));
  };

  const handleImageButtonClick = () => {
    // Programmatically trigger the hidden file input
    document.getElementById("fileInput").click();
  };

  const handleButtonClick = (button) => {
    switch (button) {
      case 'overview':
        setOverviewClicked(true);
        setDocumentClicked(false);
        setDreamboardClicked(false);
        setMentalHealthClicked(false);
        setPricingClicked(false);
        setSettingClicked(false);
        setContactUsClicked(false);
        break;
      case 'document':
        setOverviewClicked(false);
        setDocumentClicked(true);
        setDreamboardClicked(false);
        setMentalHealthClicked(false);
        setPricingClicked(false);
        setSettingClicked(false);
        setContactUsClicked(false);
        break;
      case 'dreamboard':
        setOverviewClicked(false);
        setDocumentClicked(false);
        setDreamboardClicked(true);
        setMentalHealthClicked(false);
        setPricingClicked(false);
        setSettingClicked(false);
        setContactUsClicked(false);
        break;
      case 'mentalHealth':
        setOverviewClicked(false);
        setDocumentClicked(false);
        setDreamboardClicked(false);
        setMentalHealthClicked(true);
        setPricingClicked(false);
        setSettingClicked(false);
        setContactUsClicked(false);
        break;
      case 'pricing':
        setOverviewClicked(false);
        setDocumentClicked(false);
        setDreamboardClicked(false);
        setMentalHealthClicked(false);
        setPricingClicked(true);
        setSettingClicked(false);
        setContactUsClicked(false);
        break;
      case 'setting':
        setOverviewClicked(false);
        setDocumentClicked(false);
        setDreamboardClicked(false);
        setMentalHealthClicked(false);
        setPricingClicked(false);
        setSettingClicked(true);
        setContactUsClicked(false);
        break;
      case 'contactUs':
        setOverviewClicked(false);
        setDocumentClicked(false);
        setDreamboardClicked(false);
        setMentalHealthClicked(false);
        setPricingClicked(false);
        setSettingClicked(false);
        setContactUsClicked(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard">
      <div className="navcontainer">
        <div className="dashboardlogo">
          <Toolbar>
            <img
              src="logo.png"
              alt="AcadZen Logo"
              style={{ width: '80px' }}
            />
            <Typography style={{ fontWeight: 'bold', color: '#8C7111', fontSize: '40px' }}>AcadZen</Typography>
          </Toolbar>
        </div>
        <Toolbar>
        <Box display="flex" flexDirection="column" alignItems="center"justifyContent="flex-start" style={{ height: '50vh', marginTop:'50px' }}>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <Button
            color="inherit"
            type="submit"
            variant={overviewClicked ? "contained" : "outlined"}
            style={{
              fontSize: '15px',
              border:'none',
              width: '250px',
              borderRadius: '10px',
              backgroundColor: overviewClicked ? 'white' : '#FAC712',
              color: overviewClicked ? '#8C7111' : 'black',
              fontWeight: 'bold',
              height: '40px',marginBottom: '30px'
            }}
            onClick={() => handleButtonClick('overview')}
          ><GradingIcon style={{marginRight:'10px'}}/> Overview</Button>
        </Link>
        <Link to="/uploaddocument" style={{ textDecoration: 'none' }}>
          <Button
          color="inherit"
          type="submit"
          variant={documentClicked ? "contained" : "outlined"}
          style={{
            fontSize: '13px',
            border:'none',
            width: '270px',
            borderRadius: '10px',
            backgroundColor: documentClicked ? 'white' : '#FAC712',
            color: documentClicked ? '#8C7111' : 'black',
            fontWeight: 'bold',
            height: '40px',marginBottom: '30px'
          }}
          onClick={() => handleButtonClick('document')}
        ><PictureAsPdfIcon style={{marginRight:'10px'}}/> Document to Flashcards</Button>
        </Link>
          <Button
          color="inherit"
          type="submit"
          variant={dreamboardClicked ? "contained" : "outlined"}
          style={{
            fontSize: '15px',
            border:'none',
            width: '250px',
            borderRadius: '10px',
            backgroundColor: dreamboardClicked ? 'white' : '#FAC712',
            color: dreamboardClicked ? '#8C7111' : 'black',
            fontWeight: 'bold',
            height: '40px',marginBottom: '30px'
          }}
          onClick={() => handleButtonClick('dreamboard')}
        ><CloudQueueIcon style={{marginRight:'10px'}}/> Dreamboard</Button>
            <Button
          color="inherit"
          type="submit"
          variant={mentalHealthClicked ? "contained" : "outlined"}
          style={{
            fontSize: '13px',
            border:'none',
            width: '250px',
            borderRadius: '10px',
            backgroundColor: mentalHealthClicked ? 'white' : '#FAC712',
            color: mentalHealthClicked ? '#8C7111' : 'black',
            fontWeight: 'bold',
            height: '40px',marginBottom: '30px'
          }}
          onClick={() => handleButtonClick('mentalHealth')}
        ><SpaIcon style={{marginRight:'10px'}}/> Mental Health Support</Button>
            <Button
          color="inherit"
          type="submit"
          variant={pricingClicked ? "contained" : "outlined"}
          style={{
            fontSize: '15px',
            border:'none',
            width: '250px',
            borderRadius: '10px',
            backgroundColor: pricingClicked ? 'white' : '#FAC712',
            color: pricingClicked ? '#8C7111' : 'black',
            fontWeight: 'bold',
            height: '40px',marginBottom: '30px'
          }}
          onClick={() => handleButtonClick('pricing')}
        ><MonetizationOnIcon style={{marginRight:'10px'}}/> Pricing</Button>
          <Link to="/profilesettings" style={{ textDecoration: 'none' }}>
          <Button
          color="inherit"
          type="submit"
          variant={settingClicked ? "contained" : "outlined"}
          style={{
            fontSize: '15px',
            border:'none',
            width: '250px',
            borderRadius: '10px',
            backgroundColor: settingClicked ? 'white' : '#FAC712',
            color: settingClicked ? '#8C7111' : 'black',
            fontWeight: 'bold',
            height: '40px',marginBottom: '30px'
          }}
          onClick={() => handleButtonClick('setting')}
        ><SettingsIcon style={{marginRight:'10px'}}/> Setting</Button>
        </Link>
        </Box>
      </Toolbar>
      <div className="contactusdiv" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{ marginBottom: '20px', width: '200px' }}>Encountering problems with our service? Reach out to our customer support team for assistance.</p>
        <Button
          color="inherit"
          type="submit"
          variant="contained"
          style={{ fontSize:'15px', width: '250px', borderRadius: '10px', backgroundColor: '#FAC712', color: 'black', fontWeight: 'bold', height:'40px' }}
        > Contact us</Button>
      </div>
      </div>
      <div className="namecontainer">
      <div className="logoutdiv" style={{display:'flex', justifyContent:'center', alignItems: 'flex-start'}}>
      <div style={{flexDirection:'column', alignItems:'center'}}>
      <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleImageButtonClick}
          style={{
            borderRadius: '50%', // Make the button circular
            width: '250px',
            height: '250px',
            padding: 0,
            marginTop:'20px',
            backgroundColor: 'white'
          }}
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="User Avatar"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            />
          ) : (
            // <Logout />
            <></>
          )}
        </Button>
        <div>
          <TextareaAutosize
            style={{ width: '90%', marginTop: '30px', height:'375px', padding:'10px' }}
            minRows={3} // You can adjust minRows as needed
            placeholder="Enter your text motto here"
            // onChange={(e) => handleTextareaChange(e.target.value)}
          />
        </div>
        <div style={{display:'flex', justifyContent:'center'}}>
          <Link to='/' style={{ textDecoration: 'none' }}>
          <Button 
            color="inherit"
            type="submit"
            variant='contained'
            style={{
              marginTop:'100px',
              fontSize: '15px',
              border:'none',
              width: '250px',
              borderRadius: '10px',
              backgroundColor: 'black',
              color: '#FAC712',
              fontWeight: 'bold',
              height: '40px',marginBottom: '30px'
            }}>
            <LogoutIcon style={{marginRight:'10px'}}/> Log out
          </Button></Link>
        </div>
      </div>
        <div className="profileContainer">
          <Typography variant="h3" style={{ fontWeight: 'bold' }}>
              User Profile
            </Typography>
            <div className="profileinfo">
            <Typography variant="h4" style={{ fontWeight: 'bold', marginTop: '15px' }}>
                Username : {username}{editingUsername ? (
                <TextField
                  label="New Username"
                  variant="outlined"
                  style={{marginLeft:"10px"}}
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              ) : (
                <span></span>
              )}
              <Button style={{backgroundColor:'white', marginLeft:'25px', color:'#8C7111'}} onClick={() => setEditingUsername(!editingUsername)}>
                {editingUsername ? 'Cancel' : 'Edit'}
              </Button>
              {/* {editingUsername && (
                <Button style={{backgroundColor:'lightgreen', color:'#8C7111'}} onClick={() => updateUsername(newUsername)}>Update</Button>
              )} */}
            </Typography>
              <Typography variant="h4" style={{ fontWeight: 'bold', marginTop: '25px' }}>
                Password : {showPassword ? password : '********'}
                
                {showPassword ? (
                  <TextField
                  label="New Password"
                  variant="outlined"
                  style={{marginLeft:"10px"}}
                  value={enteredPassword}
                  onChange={(e) => setEnteredPassword(e.target.value)}
                />
                ) : (
                  <span></span>
                  )}
                <Button
                  style={{ backgroundColor: 'white', marginLeft: '25px', color: '#8C7111' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Button>
                {/* {showPassword && (
                  <Button style={{backgroundColor:'lightgreen', color:'#8C7111'}} onClick={() => updatePassword(enteredPassword)}>Update</Button>
                )} */}
              
              </Typography>
              
              {/* // Save Profile button */}
              <Button
                style={{ backgroundColor: 'lightgreen', color: '#8C7111' }}
                onClick={() => updateProfile(newUsername, enteredPassword)}
              >
                Update
              </Button>
            </div>
        </div>
        
      </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
