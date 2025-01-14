import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import "../styles/Home.css"
import Login from './Login'
import Heading from '../components/LoginHeading'
import Navbar from '../components/Navbar'
function Home() {
  return (
    <div>
      <Login>
      </Login>
    </div>
  )
}

export default Home
