import React, { useState, useEffect } from 'react'
import '../styles/Dashboard.css';
import SpiritGauge from '../assets/spirit.png';
import BrainPowerGauge from '../assets/brainpower_percentage.png';
import MotivationGauge from '../assets/motivation.png';
import Select from 'react-select'
import battery25 from '../assets/battery25.png';
import battery50 from '../assets/battery50.png';
import battery75 from '../assets/battery75.png';
import batteryfull from '../assets/batteryfull.png';
import { IoMdRefresh } from "react-icons/io";




let  hasBeenCalled = false;

const dates = [
  { value: "jan", label: "January"},
  { value: "feb", label: "February"},
  { value: "mar", label: "March"},
  { value: "apr", label: "April"},
  { value: "may", label: "May"},
  { value: "jun", label: "June"},
  { value: "jul", label: "July"},
  { value: "aug", label: "August"},
  { value: "sep", label: "September"},
  { value: "oct", label: "October"},
  { value: "nov", label: "November"},
  { value: "dec", label: "December"},
];

const flightDataByDate = {
  January: {
    data: [
      { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ]
  },
  February: {
    data: [
      { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ]
  },
  March: {
    data: [
      { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ]
  },
  April: {
    data: [
      { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ]
  },
  May: {
    data: [
      { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ]
  },
  June: {
    data: [
      { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ]
  },
  July: {
    data: [
      { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ]
  },
  August: {
    data: [
      { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ]
  },
  September: {
    data: [
      { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ]
  },
  October: {
    data: [
      { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ]
  },
  November: {
    data: [
      { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ]
  },
  December: {
    data: [
      { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ]
  },
};

function fetchMAVLinkDataForMonth(month) {
    const userID = localStorage.getItem('userid'); // Get the user ID
    const url = `https://rgs.bansheeuav.tech/api/users/${userID}/mavlink_data/${month}`; // Construct the URL
    
    // Make a GET request to fetch MAVLink data
    return fetch(url)
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch MAVLink data');
            }
            // Parse the response JSON
            return response.json();
        })
        .then(data => {
          console.log(data);
          return data;
        })
        .catch(error => {
            // Handle any errors that occurred during fetching
            console.error(`Error fetching MAVLink data for ${month}:`, error);
            return []; // Return an empty array in case of error
        });
}
// Function to fetch MAVLink data for each month
async function fetchMAVLinkDataForAllMonths(dates) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if(!hasBeenCalled) {
      // Fetch MAVLink data for each month asynchronously
      for (const month of months) {
        const mavLinkData = await fetchMAVLinkDataForMonth(month);
        flightDataByDate[month] = mavLinkData;
      }
      console.log('MAVLink Data by Date:', flightDataByDate);
      hasBeenCalled = true;
    }

}






const batterychambers = [
  { value: 1, label: "Chamber 1"},
  { value: 2, label: "Chamber 2"},
  { value: 3, label: "Chamber 3"},
  { value: 4, label: "Chamber 4"},
  { value: 5, label: "Chamber 5"},
  { value: 6, label: "Chamber 6"},
  { value: 7, label: "Chamber 7"},
  { value: 8, label: "Chamber 8"}
];

const batteryData = {
  packet: {
    location: "Pomona",
    battery_data: [
        {
            batt_id: 1,
            total_volt: 0,
            volts: [0, 0, 0, 0]
        },        {
            batt_id: 2,
            total_volt: 0,
            volts: [0, 0, 0, 0]
        },        {
            batt_id: 3,
            total_volt: 0,
            volts: [0, 0, 0, 0]
        },        {
            batt_id: 4,
            total_volt: 0,
            volts: [0, 0, 0, 0]
        },        {
            batt_id: 5,
            total_volt: 0,
            volts: [0, 0, 0, 0]
        },        {
            batt_id: 6,
            total_volt: 0,
            volts: [10, 0, 0, 0 ]
        },        {
            batt_id: 7,
            total_volt: 0,
            volts: [0, 0, 0, 0]
        },        {
            batt_id: 8,
            total_volt: 0,
            volts: [0, 0, 0, 0]
        }
    ]
  }
};

const batteryImages = {
  '20%': battery25,
  '50%': battery50,
  '75%': battery75,
  '100%': batteryfull,
};


function getBatteryImage(voltage, maxVoltage) {
  const percentage = (voltage / maxVoltage) * 100;

  if (percentage <= 20) {
    return batteryImages['20%']; // Use the actual image file
  } else if (percentage <= 50) {
    return batteryImages['50%'];
  } else if (percentage <= 75) {
    return batteryImages['75%'];
  } else {
    return batteryImages['100%'];
  }
}

function fetchBatteryData() {
  const url = `https://rgs.bansheeuav.tech/api/rgs/voltages/Pomona`; // Construct the URL
  const packet = 'packet';
  
  // Make a GET request to fetch battery data
  return fetch(url)
      .then(bresponse => {
          // Check if the response is successful
          if (!bresponse.ok) {
              throw new Error('Failed to fetch batter data');
          }
          // Parse the response JSON
          return bresponse.json();
      })
      .then(bdata => {
        console.log('Battery Data fetched: ', bdata);
        batteryData[packet] = bdata;
        console.log('Battery Data : ', batteryData);
        return bdata;
      })
      .catch(error => {
          // Handle any errors that occurred during fetching
          console.error(`Error fetching battery data`, error);
          return []; // Return an empty array in case of error
      });
}




function Dashboard() {
  
  // Call the function to fetch MAVLink data for all months
  const firstFetchFD = fetchMAVLinkDataForAllMonths;
  firstFetchFD();

  const firstFetchBD = fetchBatteryData;
  firstFetchBD();

  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
  const [selectedDate, setSelectedDate] = useState(currentMonth);

  useEffect(() => {
    // You can fetch or update data here based on the selected date
    console.log("Fetching data for month:", selectedDate);
  }, [selectedDate]);


  const dateChange = (selectedOptionF) => {
    setSelectedDate(selectedOptionF.label);
    fetchMAVLinkDataForMonth(selectedOptionF.label);
  };





  const [selectedChamber, setSelectedChamber] = useState(batterychambers[0].value);

  useEffect(() => {
    // You can fetch or update data here based on the selected date
    console.log("Fetching battery data for chamber:", selectedChamber);
  }, [selectedChamber]);

  const chamberChange = (selectedOptionB) => {
    setSelectedChamber(selectedOptionB.value);
    fetchBatteryData();
  };

  return (
    <div className='container'>
      <div className='heading'>GROUND CONTROL STATION DASHBOARD</div>
      <div className='card-wrapper'>
        <div className='left-side'>
          <div className='flightdata'>
            <div className='flightdata-header'>
              <div className='card-title'>Flight Data <IoMdRefresh className='refresh-icon' onClick={() => fetchMAVLinkDataForMonth(selectedDate)}/></div>
              <Select options={dates} onChange={dateChange} value={dates.find(date => date.label === selectedDate)} />
            </div>
            <div className='table-container'>
              <table>
                    <tr>
                        <th>mavpackettype</th>
                        <th>type</th>
                        <th>autopilot</th>
                        <th>base_mode</th>
                        <th>custom_mode</th>
                        <th>system_status</th>
                        <th>mavlink_version</th>
                    </tr>
                    {flightDataByDate[selectedDate].data.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.mavpackettype}</td>
                                <td>{val.type}</td>
                                <td>{val.autopilot}</td>
                                <td>{val.base_mode}</td>
                                <td>{val.custom_mode}</td>
                                <td>{val.system_status}</td>
                                <td>{val.mavlink_version}</td>
                            </tr>
                        )
                    })}
              </table>
            </div>
          </div>
          <div className='battery'>
            <div className='battery-header'>
              <div className='card-title'>Battery Voltages <IoMdRefresh className='refresh-icon' onClick={() => fetchBatteryData}/></div>
              <Select options={batterychambers} onChange={chamberChange} value={batterychambers.find(chamber => chamber.value === selectedChamber)} />
            </div>
            <div className='table-container'>
              <table className='batterytable'>
                    <tr>
                        <th>Chamber</th>
                        <th>Voltage</th>
                        <th>Cell 1</th>
                        <th>Cell 2</th>
                        <th>Cell 3</th>
                        <th>Cell 4</th>
                    </tr>
                    {batteryData.packet.battery_data.map((val, key) => {
                        if (val.batt_id === selectedChamber) {
                          return (
                            <tr key={key}>
                              <td>{val.batt_id}</td>
                              <td style={{ backgroundImage: `url(${getBatteryImage(val.total_volt, 16)})`}}>{val.total_volt}</td>
                              <td style={{ backgroundImage: `url(${getBatteryImage(val.volts[0], 4)})`}}>{val.volts[0]}</td>
                              <td style={{ backgroundImage: `url(${getBatteryImage(val.volts[1], 4)})`}}>{val.volts[1]}</td>
                              <td style={{ backgroundImage: `url(${getBatteryImage(val.volts[2], 4)})`}}>{val.volts[2]}</td>
                              <td style={{ backgroundImage: `url(${getBatteryImage(val.volts[3], 4)})`}}>{val.volts[3]}</td>
                            </tr>
                          );
                        }
                        return null; // Render nothing if the chamber doesn't match selectedChamber
                    })}
              </table>
            </div>
          </div>
        </div>
        <div className='right-side'>
          <div className='spirit'>
            <h1 className='spirit-header' id='header'>Team Spirit</h1>
            <img className='spirit-gauge' id='gauge' src={SpiritGauge} alt="spirit" />
          </div>
          <div className='brain-power'>
            <h1 className='brainpower-header' id='header'>Team Brain Power</h1>
            <img className='spirit-gauge' id='gauge' src={BrainPowerGauge} alt="spirit" />
          </div>
          <div className='motivation'>
            <h1 className='motivation-header' id='header'>Team Motivation</h1>
            <img className='spirit-gauge' id='gauge' src={MotivationGauge} alt="spirit" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
