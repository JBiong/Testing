// Dashboard.js
import React, { useEffect, useState } from "react";
import { Box, Button, Toolbar, Typography } from "@mui/material";
import "./Dashboard.css";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import GradingIcon from '@mui/icons-material/Grading';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import SpaIcon from '@mui/icons-material/Spa';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const location = useLocation();

  const [overviewClicked, setOverviewClicked] = useState(false);
  const [documentClicked, setDocumentClicked] = useState(false);
  const [dreamboardClicked, setDreamboardClicked] = useState(false);
  const [mentalHealthClicked, setMentalHealthClicked] = useState(false);
  const [pricingClicked, setPricingClicked] = useState(false);
  const [settingClicked, setSettingClicked] = useState(false);
  const [contactUsClicked, setContactUsClicked] = useState(false);

  const [enteredUsername, setEnteredUsername] = useState(""); // Use the entered username
  const [userName, setUserName] = useState(""); // Set a default value

  

  useEffect(() => {
    // Check if the current location is /dashboard and set the Overview button state accordingly
    setOverviewClicked(location.pathname === "/dashboard");
    setDocumentClicked(location.pathname === "/uploaddocument");
    setDreamboardClicked(location.pathname === "/dreamboard");
    setMentalHealthClicked(location.pathname === "/mentalhealth");
    setPricingClicked(location.pathname === "/pricing");
    setSettingClicked(location.pathname === "/profilesettings")
    setContactUsClicked(location.pathname === "/contactus");
    
    // Extract entered username from location state
    const newEnteredUsername = location.state?.enteredUsername || "";
    setEnteredUsername(newEnteredUsername);
    // Retrieve userno from localStorage
    const storedUserNo = localStorage.getItem('userno');
    console.log(storedUserNo); // Use this userno as needed
    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem('username');
    setUserName(storedUsername || "Guest");
    console.log(storedUsername);
    // setUserName(newEnteredUsername || "Guest");
  }, [location.pathname, location.state?.enteredUsername]);

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
        <Toolbar style={{ margin: '10px' }}>
          <img
            src="prof.png"
            alt="AcadZen profile"
            style={{ width: '70px' }}
          />
          <div style={{ marginLeft: '20px' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              Welcome Back,
            </Typography>
            <Typography variant="h3" style={{ fontWeight: 'bold' }}>
              {userName}
            </Typography>
          </div>
        </Toolbar>
        <div className="quizact">
          <h3>Recent Quiz Activity</h3>
          <div className="insidequizdiv" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}></div>
        </div>
        <div className="recentdiv" style={{ display: 'flex', flexDirection: 'space-between', alignItems: 'center' }}></div>
          <div className="uploadstatus" style={{ display: 'flex', flexDirection: 'space-between', alignItems: 'center' }}></div>
          <div className="currentstreakdiv" style={{ display: 'flex', flexDirection: 'space-between', alignItems: 'center' }}></div>
          <div className="mottocontainer"></div>
          <div className="dreamboardnote"></div>
      </div>
    </div>
  );
};

export default Dashboard;
