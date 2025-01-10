import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import "../styles/Home.css"
import Login from './Login'
import Heading from '../components/Heading'
function Home() {
  return (
    <div>
      <Heading></Heading>
      <Login>
      </Login>
    </div>
  )
}

export default Home
