import React from 'react'
import '../styles/Dashboard.css';
import background2 from '../assets/background2.jpg';

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
  return (
    <div className='container'>
      <div className='heading'>GROUND CONTROL STATION DASHBOARD</div>
      <div className='card-wrapper'>
        <div className='left-side'>
          <div className='flightdata'>
            <div className='flightdata-header'>
              <div className='card-title'>Flight Data</div>
              <div class="dropdownstuff">
                <div class="dropdown">
                    <div class="select">
                        <span class="selected">November</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill='white' height="24" viewBox="0 -960 960 960" width="24"><path d="M480-360 280-560h400L480-360Z"/></svg>
                    </div>
                    <ul class="menu">
                        <li>January</li>
                        <li>February</li>
                        <li>March</li>
                        <li>April</li>
                        <li>May</li>
                        <li>June</li>
                        <li>July</li>
                        <li>August</li>
                        <li>September</li>
                        <li>October</li>
                        <li class="active">November</li>
                        <li>December</li>
                    </ul>
                </div>
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
