import axios from 'axios';


const URL = "https://api.openweathermap.org/data/2.5/weather";
const API = "f8204b452a328618bc34e74d007cb640";


export const fetchWeather = async (query) => {
  let data;
  let error;

  const response = await axios.get(URL,
    {
      params: {
        q: query,
        appid: API,
        units: "metric"
      }
    }).then(res => {
      data = res.data;
      console.log(data);
    }).catch(err => {
      if (err) {
        error = err.response.data;
      }else{
        alert('check internet connection')
      }
    });

  if (data) {
    return data
  } else {
    return error
  }
}



