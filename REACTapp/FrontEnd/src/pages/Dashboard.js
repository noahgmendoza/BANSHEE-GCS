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
  jan: [
    { mavpackettype: "JANUARY", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ],
  feb: [
    { mavpackettype: "FEBRUARY", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ],
  mar: [
    { mavpackettype: "MARCH", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ],
  apr: [
    { mavpackettype: "APRIL", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ],
  may: [
    { mavpackettype: "MAY", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ],
  jun: [
    { mavpackettype: "JUNE", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ],
  jul: [
    { mavpackettype: "JULY", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ],
  aug: [
    { mavpackettype: "AUGUST", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ],
  sep: [
    { mavpackettype: "SEPTEMBER", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ],
  oct: [
    { mavpackettype: "OCTOBER", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ],
  nov: [
    { mavpackettype: "NOVEMBER", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ],
  dec: [
    { mavpackettype: "DECEMBER", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
    ],
};

const batterychambers = [
  { value: "c1", label: "Chamber 1"},
  { value: "c2", label: "Chamber 2"},
  { value: "c3", label: "Chamber 3"},
  { value: "c4", label: "Chamber 4"},
  { value: "c5", label: "Chamber 5"},
  { value: "c6", label: "Chamber 6"},
  { value: "c7", label: "Chamber 7"},
  { value: "c8", label: "Chamber 8"}
];

const chamberData = {
  c1: [{ chambernumber: "1", voltage: "14.8", cell1: "3.7", cell2: "3.7", cell3: "3.7", cell4: "3.7" }],
  c2: [{ chambernumber: "2", voltage: "11.3", cell1: "3.7", cell2: "2.5", cell3: "3.7", cell4: "1.4" }],
  c3: [{ chambernumber: "3", voltage: "4.5", cell1: "0", cell2: "0.5", cell3: "2.8", cell4: "1.2" }],
  c4: [{ chambernumber: "4", voltage: "14.8", cell1: "3.7", cell2: "3.7", cell3: "3.7", cell4: "3.7" }],
  c5: [{ chambernumber: "5", voltage: "15.2", cell1: "3.8", cell2: "3.8", cell3: "3.8", cell4: "3.8" }],
  c6: [{ chambernumber: "6", voltage: "14.8", cell1: "3.7", cell2: "3.7", cell3: "3.7", cell4: "3.7" }],
  c7: [{ chambernumber: "7", voltage: "14.8", cell1: "3.7", cell2: "3.7", cell3: "3.7", cell4: "3.7" }],
  c8: [{ chambernumber: "8", voltage: "0", cell1: "0", cell2: "0", cell3: "0", cell4: "0" }]
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

function Dashboard() {

  const currentMonth = new Date().toLocaleString('en-US', { month: 'short' }).toLowerCase();
  const [selectedDate, setSelectedDate] = useState(currentMonth);

  useEffect(() => {
    // You can fetch or update data here based on the selected date
    console.log("Fetching data for month:", selectedDate);
  }, [selectedDate]);


  const dateChange = (selectedOption) => {
    setSelectedDate(selectedOption.value);
  };

  const [selectedChamber, setSelectedChamber] = useState(batterychambers[0].value);

  const chamberChange = (selectedOption) => {
    setSelectedChamber(selectedOption.value);
  };

  return (
    <div className='container'>
      <div className='heading'>GROUND CONTROL STATION DASHBOARD</div>
      <div className='card-wrapper'>
        <div className='left-side'>
          <div className='flightdata'>
            <div className='flightdata-header'>
              <div className='card-title'>Flight Data</div>
              <Select options={dates} onChange={dateChange} value={dates.find(date => date.value === selectedDate)} />
            </div>
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
                  {flightDataByDate[selectedDate].map((val, key) => {
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
          <div className='battery'>
            <div className='battery-header'>
              <div className='card-title'>Battery Voltages</div>
              <Select options={batterychambers} onChange={chamberChange} value={batterychambers.find(chamber => chamber.value === selectedChamber)} />
            </div>
            <table>
                  <tr>
                      <th>Chamber</th>
                      <th>Voltage</th>
                      <th>Cell 1</th>
                      <th>Cell 2</th>
                      <th>Cell 3</th>
                      <th>Cell 4</th>
                  </tr>
                  {chamberData[selectedChamber].map((val, key) => {
                      return (
                          <tr key={key}>
                              <td>{val.chambernumber}</td>
                              <td style={{ backgroundImage: `url(${getBatteryImage(parseFloat(val.voltage), 16)})`}}>{val.voltage}</td>
                              <td style={{ backgroundImage: `url(${getBatteryImage(parseFloat(val.cell1), 4)})`}}>{val.cell1}</td>
                              <td style={{ backgroundImage: `url(${getBatteryImage(parseFloat(val.cell2), 4)})`}}>{val.cell2}</td>
                              <td style={{ backgroundImage: `url(${getBatteryImage(parseFloat(val.cell3), 4)})`}}>{val.cell3}</td>
                              <td style={{ backgroundImage: `url(${getBatteryImage(parseFloat(val.cell4), 4)})`}}>{val.cell4}</td>
                          </tr>
                      )
                  })}
            </table>
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
