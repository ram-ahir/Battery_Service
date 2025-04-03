import React from 'react'
import './Teststyle.css'
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from '../../Firebase';

const db = getFirestore(app); // Initialize Firestore



const Test = () => {

  const carmodel = [
    { make: "Maruti Suzuki", model: "Alto 800", year: "2016", type: "Petrol", battery_model: "40121" },
    { make: "Maruti Suzuki", model: "Alto 800", year: "2016", type: "CNG", battery_model: "40122" },
    { make: "Maruti Suzuki", model: "Alto 800", year: "2017", type: "Petrol", battery_model: "40123" },
    { make: "Maruti Suzuki", model: "Alto 800", year: "2017", type: "CNG", battery_model: "40241" },
    { make: "Maruti Suzuki", model: "Alto 800", year: "2018", type: "Petrol", battery_model: "40242" },
    { make: "Maruti Suzuki", model: "Alto 800", year: "2018", type: "CNG", battery_model: "40243" },
    { make: "Maruti Suzuki", model: "Alto 800", year: "2019", type: "Petrol", battery_model: "40361" },
    { make: "Maruti Suzuki", model: "Alto 800", year: "2019", type: "CNG", battery_model: "40362" },
    { make: "Maruti Suzuki", model: "Alto 800", year: "2020", type: "Petrol", battery_model: "40363" },
    { make: "Maruti Suzuki", model: "Alto 800", year: "2020", type: "CNG", battery_model: "50121" },
    { make: "Maruti Suzuki", model: "Alto 800", year: "2021", type: "Petrol", battery_model: "50122" },
    { make: "Maruti Suzuki", model: "Alto 800", year: "2021", type: "CNG", battery_model: "50123" },
    { make: "Maruti Suzuki", model: "Alto K10", year: "2014", type: "Petrol", battery_model: "50241" },
    { make: "Maruti Suzuki", model: "Alto K10", year: "2014", type: "CNG", battery_model: "50242" },
    { make: "Maruti Suzuki", model: "Alto K10", year: "2015", type: "Petrol", battery_model: "50243" },
    { make: "Maruti Suzuki", model: "Alto K10", year: "2015", type: "CNG", battery_model: "50361" },
    { make: "Maruti Suzuki", model: "Alto K10", year: "2016", type: "Petrol", battery_model: "50362" },
    { make: "Maruti Suzuki", model: "Alto K10", year: "2016", type: "CNG", battery_model: "50363" },
    { make: "Maruti Suzuki", model: "Swift", year: "2005", type: "Petrol", battery_model: "60121" },
    { make: "Maruti Suzuki", model: "Swift", year: "2005", type: "Diesel", battery_model: "60122" },
    { make: "Maruti Suzuki", model: "Swift", year: "2005", type: "CNG", battery_model: "60123" },
    { make: "Maruti Suzuki", model: "Swift", year: "2006", type: "Petrol", battery_model: "60241" },
    { make: "Maruti Suzuki", model: "Swift", year: "2006", type: "Diesel", battery_model: "60242" },
    { make: "Maruti Suzuki", model: "Swift", year: "2006", type: "CNG", battery_model: "60243" },
    { make: "Maruti Suzuki", model: "Dzire", year: "2008", type: "Petrol", battery_model: "60361" },
    { make: "Maruti Suzuki", model: "Dzire", year: "2008", type: "Diesel", battery_model: "60362" },
    { make: "Maruti Suzuki", model: "Dzire", year: "2008", type: "CNG", battery_model: "60363" },
    { make: "Maruti Suzuki", model: "WagonR", year: "1999", type: "Petrol", battery_model: "40121" },
    { make: "Maruti Suzuki", model: "WagonR", year: "1999", type: "CNG", battery_model: "40122" },
    { make: "Maruti Suzuki", model: "WagonR", year: "2000", type: "Petrol", battery_model: "40123" },
    { make: "Maruti Suzuki", model: "WagonR", year: "2000", type: "CNG", battery_model: "40241" },
    { make: "Maruti Suzuki", model: "Celerio", year: "2014", type: "Petrol", battery_model: "40242" },
    { make: "Maruti Suzuki", model: "Celerio", year: "2014", type: "CNG", battery_model: "40243" },
    { make: "Maruti Suzuki", model: "S-Presso", year: "2019", type: "Petrol", battery_model: "40361" },
    { make: "Maruti Suzuki", model: "S-Presso", year: "2019", type: "CNG", battery_model: "40362" },
    { make: "Maruti Suzuki", model: "Baleno", year: "2015", type: "Petrol", battery_model: "40363" },
    { make: "Maruti Suzuki", model: "Ignis", year: "2017", type: "Petrol", battery_model: "50121" },
    { make: "Maruti Suzuki", model: "Ciaz", year: "2014", type: "Petrol", battery_model: "50122" },
    { make: "Maruti Suzuki", model: "Ciaz", year: "2014", type: "Diesel", battery_model: "50123" },
    { make: "Maruti Suzuki", model: "XL6", year: "2019", type: "Petrol", battery_model: "50241" },
    { make: "Maruti Suzuki", model: "XL6", year: "2019", type: "CNG", battery_model: "50242" },
    { make: "Maruti Suzuki", model: "Ertiga", year: "2012", type: "Petrol", battery_model: "50243" },
    { make: "Maruti Suzuki", model: "Ertiga", year: "2012", type: "Diesel", battery_model: "50361" },
    { make: "Maruti Suzuki", model: "Ertiga", year: "2012", type: "CNG", battery_model: "50362" },
    { make: "Maruti Suzuki", model: "Brezza", year: "2016", type: "Petrol", battery_model: "50363" },
    { make: "Maruti Suzuki", model: "Brezza", year: "2016", type: "Diesel", battery_model: "60121" },
    { make: "Maruti Suzuki", model: "Grand Vitara", year: "2022", type: "Petrol", battery_model: "60122" },
    { make: "Maruti Suzuki", model: "Grand Vitara", year: "2022", type: "Hybrid", battery_model: "60123" },
    { make: "Maruti Suzuki", model: "Jimny", year: "2023", type: "Petrol", battery_model: "60241" },
    { make: "Maruti Suzuki", model: "Fronx", year: "2023", type: "Petrol", battery_model: "60242" },
    { make: "Maruti Suzuki", model: "Fronx", year: "2023", type: "CNG", battery_model: "60243" },
    { make: "Maruti Suzuki", model: "Omni", year: "1985", type: "Petrol", battery_model: "60361" },
    { make: "Maruti Suzuki", model: "Omni", year: "1985", type: "CNG", battery_model: "60362" },
    { make: "Maruti Suzuki", model: "Gypsy", year: "1985", type: "Petrol", battery_model: "60363" }

  ];
  let id = 101
  // Function to Upload Models to Firestore
  const uploadBatteryModels = async () => {
    try {
      for (const model of carmodel) {
        await setDoc(doc(db, "car", id.toString()), model);
        console.log(`Uploaded: ${id}`);
        id++;
      }
      console.log("All models uploaded successfully!");
    } catch (error) {
      console.error("Error uploading models:", error);
    }
  };

  const getdata = async () => {
    // const response = await fetch("https://www.apmcrajkot.com/home/get_daily_rates", {
    //   method: "POST",
    //   body: JSON.stringify({ date: "01%2F04%2F2025" }),

    // });

    const response = await fetch("https://www.apmcrajkot.com/home/get_daily_rates", {

      "referrer": "https://www.apmcrajkot.com/daily_rates",
      // "referrerPolicy": "strict-origin-when-cross-origin",
      "body": "date=01%2F04%2F2025",
      "method": "POST",
      // "mode": "cors",
      // "credentials": "include"

    }).then(response => response.json()).then(console.log);
    // fetch("https://www.apmcrajkot.com/home/get_daily_rates", {
    //   "headers": {
    //     "accept": "application/json, text/javascript, */*; q=0.01",
    //     "accept-language": "en-US,en;q=0.9",
    //     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    //     "priority": "u=1, i",
    //     "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
    //     "sec-ch-ua-mobile": "?1",
    //     "sec-ch-ua-platform": "\"Android\"",
    //     "sec-fetch-dest": "empty",
    //     "sec-fetch-mode": "cors",
    //     "sec-fetch-site": "same-origin",
    //     "x-requested-with": "XMLHttpRequest"
    //   },
    //   "referrer": "https://www.apmcrajkot.com/daily_rates",
    //   "referrerPolicy": "strict-origin-when-cross-origin",
    //   "body": "date=02%2F04%2F2025",
    //   "method": "POST",
    //   "mode": "cors",
    //   "credentials": "include"
    // });
    console.log(response)
    console.log("ads")

  };
  return (
    <div>
      <button className='btn btn-dark' onClick={getdata}>getdata</button>
    </div>
  )
}


export default Test
