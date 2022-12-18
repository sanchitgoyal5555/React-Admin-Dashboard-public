import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { useState,useEffect } from "react";
import axios from 'axios'

function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}



const makeStyle=(status)=>{
  if(status === 'Approved')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'Pending')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}


export default function BasicTable() {

  const [data, setData] = useState("");

    useEffect(()=>{
      const getData=async()=>{
      const res=await axios.get("https://api.thingspeak.com/channels/1937438/feeds.json?results=2");
      setData(res.data);
      }
      getData();
      // console.log(data);

  },[])
  let moistureVal = data?.feeds?.[0]?.field2;
  let temperatureVal = data?.feeds?.[0]?.field3;
  let humidityVal = data?.feeds?.[0]?.field4;
  let lightVal = data?.feeds?.[0]?.field1;
  let agroScore = (moistureVal*1.1)+(temperatureVal*1.1)+(humidityVal*0.5)+(lightVal*0.25);

  
const rows = [
  createData("Farm A", data?.channel?.id, "recently", agroScore),
  // createData("Farm B", 18908424, "17 hours ago", "x "),
  // createData("Farm C", 18908424, "20 hours ago", "85"),
  // createData("Farm D", 18908421, "12 hours ago", "78"),
];
  console.log("actual potty",data);
  
  return (
      <div className="Table">
      <h3>Farm Details...</h3>
        <TableContainer
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Farm Location</TableCell>
                <TableCell align="left">Tracking ID</TableCell>
                <TableCell align="left">Last Updated</TableCell>
                <TableCell align="left">AgroScore</TableCell>
                <TableCell align="left">More Info</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.trackingId}</TableCell>
                  <TableCell align="left">{row.date}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                  </TableCell>
                  <TableCell align="left" className="Details">Details</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
