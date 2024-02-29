import React from 'react'
import { Link } from "react-router-dom";
import background from '../assets/background_home.jpg';
import gif1 from '../assets/gif1.gif';
import gif2 from '../assets/gif2.gif';
import gif3 from '../assets/gif3.gif';
import "../styles/Home.css";

function Home() {
  return (
    <div className='home' style={{ backgroundImage: `url(${background})`}}>
      <div className='top'>
        <h1>Robotic Ground System Hub</h1>
        <pre>
          {'Welcome to the RGS Hub!\nAll drone data is organized and\naccessible through this webpage!\nCheck out our Dashboard!'}
        </pre>
        <Link to="/dashboard">
          <button> Dashboard </button>
        </Link>
      </div>
      <div className='bottom'>
        <div className='left'>
          <h1>BANSHEEUAV</h1>
          <p>BANSHEEUAV is focused on increasing UAV flight time. In the Robotic Ground System (RGS), the Ground Control Station (GCS) receives drone telemetry data upon landing and periodically reads current battery voltages from Battery Vending Machine, a rotating battery charging station.
                      The offloaded data is uploaded to a predefined database. This website is for providing a user-friendly viewing of the drone data, battery voltage.
                      </p>
        </div>
        <div className='right'>
          <div className='gif' style={{ backgroundImage: `url(${gif1})`}}></div>
          <div className='gif' style={{ backgroundImage: `url(${gif2})`}}></div>
          <div className='gif' style={{ backgroundImage: `url(${gif3})`}}></div>
          {/* <div>box</div> */}
          {/* <div>box</div> */}
        </div>
      </div>
    </div>
  )
}

export default Home