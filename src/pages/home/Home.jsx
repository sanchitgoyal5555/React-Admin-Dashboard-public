import React from 'react'
import '../../App.css'
import MainDash from '../../components/MainDash/MainDash'
import RightSide from '../../components/RigtSide/RightSide'
import Sidebar from '../../components/Sidebar'
import axios from 'axios'
import { useState,useEffect } from 'react';
const Home = () => {
  //   const [data, setData] = useState("");

  //   useEffect(()=>{
  //     const getData=async()=>{
  //     const res=await axios.get("https://api.thingspeak.com/channels/1937438/feeds.json?results=2");
  //     setData(res.data);
  //     }
  //     getData();
  //     // console.log(data);

  // },[])
  // console.log("potty",data);
  return (
    <div className="App">

        <div className="AppGlass">


          <Sidebar />
          <MainDash />
          <RightSide />
        </div>
      </div>
  )
}

export default Home