import React, { useState } from 'react';
import { fetchWeather } from '../fetchWeather';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import "./Weather.css";

const Weather = (props) => {

    const [weather, setWeather] = useState('');
    const [place, setPlace] = useState('');
    const [picture, setPicture] = useState('');
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let data;
    const search = async (e) => {
        data = await fetchWeather(place);
        setWeather(data);
        if (data.weather) {
            let st = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
            setPicture(st);
        }
        handleOpen();
        console.log(data.name);
        console.log(data);
        setPlace("");
    }

    const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: '#f7f219',
            width:'200px',
            height:'300px'
        },
    }));

    const classes = useStyles();
    
    

    return (
        <div class="main">
            <div>
                <h3 class="header">Check the Weather!!!</h3>
                <span class="header"><b>Enter your City Name</b></span>
                <TextField style={{ margin: 6 }} label="City Name" value={place} onChange={(e) => setPlace(e.target.value)} required="true" />
                <br />
                <Button style={{ margin: 6 }} variant="contained" style={{ backgroundColor: "#04d546" }} onClick={search}>
                    SEARCH
      </Button>
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper} style={{padding:'10px'}}>
                        {
                            weather.main ? (
                                <div style={{textAlign:'center', padding:'10px'}}>
                                   <span style={{fontSize:'20px', textAlign:'center',fontFamily:'Averia Serif Libre, cursive'}}>{weather.name} </span > <sup style={{backgroundColor:'orange'}}>{weather.sys.country}</sup> 
                                    <div style={{textAlign:'center',padding:'10px'}}>
                                    <span><b>Pressure:</b> {weather.main.pressure}</span><br/>
                                    <span><b>Humidity:</b> {weather.main.humidity}%</span><br/>
                                    <span><b>Temperature:</b> {weather.main.temp}&deg;C</span><br/>
                                    <span><b>Wind Speed:</b> {weather.wind.speed}m/sec</span><br/>
                                    <span><b>Description:</b>{weather.weather[0].description}</span><br/>               
                                    <img src={picture} style={{height:'100px', width:'100px'}} alt="image" />
                                    </div>
                                        
                                </div>
                            ) : (<div class="error"><b>{weather.message}</b></div>)
                        }
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default Weather;