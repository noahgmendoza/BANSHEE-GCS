import React from 'react'
import { Link } from "react-router-dom";
import background from '../assets/background_home.jpg';
import "../styles/Home.css";

function Home() {
  return (
    <div className='home' style={{ backgroundImage: `url(${background})`}}>
      <div className='top'>
        <h1>Ground Control Station Data Hub</h1>
        <pre>
          {'Welcome to the GCS Data Hub!\nAll drone data is organized and\naccessible through this webpage!\nCheck out our Dashboard!'}
        </pre>
        <Link to="/dashboard">
          <button> Dashboard </button>
        </Link>
      </div>
      <div className='bottom'>
        <div className='left'>
          <h1>Filler Text</h1>
          <p>Lorem ipsum dolor sit amet. Sit iusto numquam est possimus dolorum a voluptatibus iste. Et magnam facilis 33 nulla dignissimos est asperiores quas quo consequatur nulla.

Id necessitatibus omnis et architecto quia aut commodi corrupti qui soluta odit ad amet odio. Ut reprehenderit incidunt non perspiciatis internos id porro odit. Cum ipsa dolores et impedit numquam ab tempora enim qui dolor fugit eos nostrum facilis et corporis praesentium. Et enim facilis vel voluptates fugit et nulla similique est voluptates vitae est architecto nobis.

Eos galisum saepe cum omnis vero qui illum sint et quaerat corporis. Eum veniam reprehenderit et nobis enim hic incidunt molestiae est asperiores modi. Eum repellat tempora sed libero fuga eum sint dolorum et quasi asperiores vel consequuntur corporis est enim eaque aut inventore voluptate.</p>
        </div>
        <div className='right'>
          <div className='gif'>Cool Banshee Gif?</div>
          <div className='gif'>Cool Banshee Gif?</div>
          <div className='gif'>Cool Banshee Gif?</div>
          {/* <div>box</div> */}
          {/* <div>box</div> */}
        </div>
      </div>
    </div>
  )
}

export default Home