import React from 'react'
import '../styles/About.css';

function About() {
  return (
    <div className='about-container'>
      <div className='about-header'>
        <h1>About Us</h1>
      </div>
      <div className='about-body'>
        <b>Who are we?</b>
        <p>
          {'We are the Robotic Ground System Team of graduate and undergraduate students who are dedicated to the BANSHEEUAV Project.\n\n'}
        </p>
        <b>Where are we?</b>
        <pre>
          {'Cal Poly Pomona\n\n'}
        </pre>
        <b>Why are we?</b>
        <pre>
          {''}
        </pre>
      </div>
      
    </div>
  )
}

export default About
