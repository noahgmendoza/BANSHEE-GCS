import React, { useState } from 'react'
import '../styles/Dashboard.css';
// import background2 from '../assets/background2.jpg';

const data = [
  { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
  { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
  { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
  { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
  { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
  { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
  { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
  { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
  { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
  { mavpackettype: "HEARTBEAT", type: "4", autopilot: "7", base_mode: "5", custom_mode: "0", system_status: "3", mavlink_version: "3" },
]

function Dashboard() {

  const [showDropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown(!showDropdown);
  };

  return (
    <div className='container'>
      <div className='heading'>GROUND CONTROL STATION DASHBOARD</div>
      <div className='card-wrapper'>
        <div className='left-side'>
          <div className='flightdata'>
            <div className='flightdata-header'>
              <div className='card-title'>Flight Data</div>

              <div class="dropdownstuff" onClick={toggleDropdown}>
                <div class="select">
                    <span class="selected">February</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill='white' height="24" viewBox="0 -960 960 960" width="24"><path d="M480-360 280-560h400L480-360Z"/></svg>
                </div>
                <ul class="menu" id={showDropdown ? "show" : "hide"}>
                    <li onClick={toggleDropdown}>January</li>
                    <li class="active" onClick={toggleDropdown}>February</li>
                    <li onClick={toggleDropdown}>March</li>
                    <li onClick={toggleDropdown}>April</li>
                    <li onClick={toggleDropdown}>May</li>
                    <li onClick={toggleDropdown}>June</li>
                    <li onClick={toggleDropdown}>July</li>
                    <li onClick={toggleDropdown}>August</li>
                    <li onClick={toggleDropdown}>September</li>
                    <li onClick={toggleDropdown}>October</li>
                    <li onClick={toggleDropdown}>November</li>
                    <li onClick={toggleDropdown}>December</li>
                </ul>
              </div>
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
                  {data.map((val, key) => {
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
          <div className='something1'>something</div>
        </div>
        <div className='right-side'>
          <div className='battery'>battery box</div>
          <div className='something2'>something else</div>
          <div className='something3'>something else</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
