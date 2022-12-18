import React from "react";
import "./Cards.css";
// import { cardsData } from "../../Data/Data";
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

import Card from "../Card/Card";
import { useState,useEffect } from "react";
import axios from 'axios'

const Cards = () => {
      const [data, setData] = useState("");

    useEffect(()=>{
      const getData=async()=>{
      const res=await axios.get("https://api.thingspeak.com/channels/1937438/feeds.json?results=2");
      setData(res.data);
      }
      getData();
      // console.log(data);

  },[])
  console.log("actual potty",data);
  let moistureVal = data?.feeds?.[0]?.field2;
  let temperatureVal = data?.feeds?.[0]?.field3;
  let humidityVal = data?.feeds?.[0]?.field4;
  let lightVal = data?.feeds?.[0]?.field1;
  let agroScore = (moistureVal*1.1)+(temperatureVal*1.1)+(humidityVal*0.5)+(lightVal*0.25);

  console.log("xyz" + agroScore);
  let cardsData = [
    {
      title: "Moisture",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: data?.feeds?.[0]?.field2,
  
      png: UilUsdSquare,
      series: [
        {
          name: "Sales",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
      ],
    },
    {
      title: "Temperature",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      barValue: data?.feeds?.[0]?.field3,
      png: UilMoneyWithdrawal,
      series: [
        {
          name: "Revenue",
          data: [10, 100, 50, 70, 80, 30, 40],
        },
      ],
    },
    {
      title: "Humidity",
      color: {
        backGround:
          "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      barValue: data?.feeds?.[0]?.field4,
      png: UilClipboardAlt,
      series: [
        {
          name: "Expenses",
          data: [10, 25, 15, 30, 12, 15, 20],
        },
      ],
    },
    {
      title: "Light",
      color: {
        backGround:
          "linear-gradient(rgb(048, 112, 054) -46.42%, rgb(035 182 033) -112.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      barValue: (data?.feeds?.[0]?.field1)-48*(data?.feeds?.[0]?.field1)+50,
      png: UilClipboardAlt,
      series: [
        {
          name: "Expenses",
          data: [10, 25, 15, 30, 12, 15, 20],
        },
      ],
    }
  ];
  return (
    <div className="Cards">
      {cardsData.map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              series={card.series}
              id={id}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
