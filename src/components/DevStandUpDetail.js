import React,{useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import backendUrl from './env.js';

const defaultTheme = createTheme();


export default function StandUpDetail() {
    const week_days=["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"]
      const role=localStorage.getItem("role");
    
      const {id}=useParams();
      const [details,setDetails]=useState(null);
      useEffect(()=>{
          if(role==="DEV"){
            axios.get(`${backendUrl}/app/standup/card/${id}`)
            .then(response=>setDetails(response.data))
            .catch(error=>alert(error.response.data["msg"]||error.response.data["detail"]));
      }},[])
      
      
      const list_notes = (notes) => {
        return (
            <>   
                {notes.map((note) => (
                <div>{`•${note}`}</div>
                ))}
            </>
        );
      };
      
   const getDay=(date)=>{
     const date_part=date.split('-');
     const day=(new Date(date_part[0],date_part[1],date_part[2])).getDay();
     return week_days[day-1];
 }
 if(details){
   return (
     <ThemeProvider theme={defaultTheme}>
       <CssBaseline />
       <Container sx={{ py: 8 }} maxWidth="md" align="center">
          {/* End hero unit */}
          <Grid container spacing={4}>
          
       <TableContainer component={Paper}>
       
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
           <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Typography gutterBottom variant="h4" component="h2">
                {`${details["date"]}(${getDay(details["date"])})`}
                </Typography>      
              </TableCell>

            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Typography gutterBottom variant="h5" component="h2">
                {`Sprint ID: ${details["sprint_id"]}`}
                </Typography>      
              </TableCell>

            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Typography gutterBottom variant="h5" component="h2">
                {`Release Cycle: ${details["release_cycle"]}`}
                </Typography>      
              </TableCell>

            </TableRow>
            <TableRow>
            <TableCell scope="row">
              <Typography gutterBottom variant="h5" component="h2">
                {`${details["accomplished"]}`}
                </Typography>      
              </TableCell>
            </TableRow>
            <TableRow>
            <TableCell scope="row">
              <Typography gutterBottom variant="h5" component="h2">
              {`${details["working_on"]}`}
                </Typography>      
              </TableCell>
            </TableRow>
            <TableRow>
            <TableCell scope="row">
              <Typography gutterBottom variant="h5" component="h2">
              {`${details["blockers"]}`}
                </Typography>      
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">
            <Typography>
              Members
            </Typography>  
            </TableCell>
            
            <TableCell align="left"><Typography>Position</Typography></TableCell>
            <TableCell align="left"><Typography>Remarks</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {details["remarks"].map((remark) => (
            <TableRow
              key={remark["id"]}
            >
              <TableCell align="left" component="th" scope="row">
                {`${remark["fname"]} ${remark["lname"]}`}
              </TableCell>
              <TableCell align="left">{`${remark["position"]}`}</TableCell>
              <TableCell align="left" sx={{width:'40%'}}>{list_notes(remark["notes"])}</TableCell>
            </TableRow>
          ))}
          <TableRow
              key={"notes"}
            >
              <TableCell align="left" component="th" scope="row">
                Notes
              </TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left" sx={{width:'40%'}}>{details["extra_notes"]}</TableCell>
        </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    </Container>
     </ThemeProvider>
   );
          }
 }