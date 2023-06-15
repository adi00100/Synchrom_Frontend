import React,{useState,useEffect} from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {useParams} from 'react-router-dom';
import axios from 'axios';
import backendUrl from './env.js';
import Button from '@mui/material/Button';

const defaultTheme = createTheme();

export default function StandUpDetail() {
  const week_days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];
  const temp = {
    "id": "738ce278-0406-11ee-9bd4-e86a648f7f2f",
    "team_id": "7ad420cb-0218-11ee-8202-207918bbbbd2",
    "date": "2023-06-06",
    "release_cycle": "PI 29",
    "sprint_id": "280",
    "accomplished": "What did you accomplish since the last meeting?",
    "working_on": "What are you working on before the next meeting?",
    "blockers": "What is getting in your way or preventing you from doing your job?",
    "extra_notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "remarks": [
      {
        "id": "7391907a-0406-11ee-b4ff-e86a648f7f2f",
        "fname": "Hari",
        "lname": "Gurung",
        "notes": [
          "Testing ni-stage",
          "Test cases to be added for 2244 and 3356"
        ],
        "position": "QA"
      },
      {
        "id": "739af459-0406-11ee-921e-e86a648f7f2f",
        "fname": "Santosh",
        "lname": "Rai",
        "notes": [
          "Testing ni-stage",
          "Test cases to be added for 2244 and 3356"
        ],
        "position": "QA"
      },
      {
        "id": "7395e8f0-0406-11ee-ae35-e86a648f7f2f",
        "fname": "Binod",
        "lname": "Rajbanshi",
        "notes": [
          "Testing ni-stage",
          "Test cases to be added for 2244 and 3356"
        ],
        "position": "Front"
      },
      {
        "id": "73a37be7-0406-11ee-bffe-e86a648f7f2f",
        "fname": "Ganesh",
        "lname": "Basnet",
        "notes": [
          "Testing ni-stage",
          "Test cases to be added for 2244 and 3356"
        ],
        "position": "Back"
      }
    ]
  }
  const role=localStorage.getItem("role");
    
  const {id}=useParams();
  const [details,setDetails]=useState(temp);
  const [sprint_id, setSprint_id] = useState(details["sprint_id"]);
  const [release_cycle, setRelease_cycle] = useState(details["release_cycle"]);
  const [accomplished, setAccomplished] = useState(details["accomplished"]);
  const [working_on, setWorking_on] = useState(details["working_on"]);
  const [blockers, setBlockers] = useState(details["blockers"]);
  const [extra_notes, setExtra_notes] = useState(details["extra_notes"]);
  const [remarks, setRemarks] = useState(details["remarks"]);
  const data_available=()=>{
    return Boolean(details) && Boolean(sprint_id) && Boolean(release_cycle) && Boolean(accomplished) && Boolean(working_on) && Boolean(blockers) && Boolean(extra_notes) && Boolean(remarks);
  }

  
  const BULLET = "•";
  const list_notes = (notes) => {
      // console.log(notes);
      let res = "";
      notes.map((note) => {
        res += BULLET + note + "\n";
      });
      return res.trimRight();
  };

  const getDay = (date) => {
    const date_part = date.split("-");
    const day = new Date(date_part[0], date_part[1], date_part[2]).getDay();
    return week_days[day - 1];
  };

  const handleRemarksChange=(event,index)=>{
    let note=event.target.value;
    const updatedRemarks=[...remarks];
    note=note.replace(new RegExp(BULLET,'g'),'');
    let notes=note.split('\n');
    updatedRemarks[index]["notes"]=notes
    setRemarks(updatedRemarks);
  }
  const handleSubmit=(event)=>{

  }
  if(data_available()){
  return (
    <ThemeProvider theme={defaultTheme}>
      {remarks}
      <CssBaseline />
      <Container sx={{ py: 8 }} maxWidth="md" align="center">
        {/* End hero unit */}
        <Grid container spacing={4}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography gutterBottom variant="h4" component="h2">
                      {`${details["date"]}(${getDay(details["date"])})`}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row">
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography gutterBottom variant="h5">
                        {`Sprint ID:`}
                      </Typography>
                      <TextField
                        margin="normal"
                        fullWidth
                        id="sprint_id"
                        label="Sprint Id"
                        name="sprint_id"
                        autoComplete="sprint_id"
                        autoFocus
                        value={sprint_id}
                        onChange={(event) => {
                          setSprint_id(event.target.value);
                        }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row">
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography gutterBottom variant="h5">
                        {`Release Cycle:`}
                      </Typography>
                      <TextField
                        margin="normal"
                        fullWidth
                        id="release_cycle"
                        label="Release Cycle"
                        name="release_cycle"
                        autoComplete="release_cycle"
                        autoFocus
                        value={release_cycle}
                        onChange={(event) => {
                          setRelease_cycle(event.target.value);
                        }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell scope="row">
                    <TextField
                      margin="normal"
                      fullWidth
                      id="accomplished"
                      label="Accomplished"
                      name="accomplished"
                      autoComplete="accomplished"
                      autoFocus
                      value={accomplished}
                      onChange={(event) => {
                        setAccomplished(event.target.value);
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell scope="row">
                    <TextField
                      margin="normal"
                      fullWidth
                      id="working_on"
                      label="Working On"
                      name="working_on"
                      autoComplete="working_on"
                      autoFocus
                      value={working_on}
                      onChange={(event) => {
                        setWorking_on(event.target.value);
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell scope="row">
                    <TextField
                      margin="normal"
                      fullWidth
                      id="blockers"
                      label="Blockers"
                      name="blockers"
                      autoComplete="blockers"
                      autoFocus
                      value={blockers}
                      onChange={(event) => {
                        setBlockers(event.target.value);
                      }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Typography>Members</Typography>
                  </TableCell>

                  <TableCell align="left">
                    <Typography>Position</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography>Remarks</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {remarks.map((remark,index) => (
                  <TableRow key={remark["id"]}>
                    <TableCell align="left" component="th" scope="row">
                      {`${remark["fname"]} ${remark["lname"]}`}
                    </TableCell>
                    <TableCell align="left">{`${remark["position"]}`}</TableCell>
                    <TableCell align="left" sx={{ width: "40%" }}>
                      <TextField
                        value={list_notes(remark["notes"])}
                        margin="normal"
                        multiline
                        fullWidth
                        autoFocus
                        onChange={(event)=>handleRemarksChange(event,index)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow key={"notes"}>
                  <TableCell align="left" component="th" scope="row">
                    Notes
                  </TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left" sx={{ width: "40%" }}>
                    <TextField
                      multiline
                      margin="normal"
                      fullWidth
                      id="notes"
                      label="Notes"
                      name="notes"
                      autoComplete="notes"
                      autoFocus
                      value={extra_notes}
                      onChange={(event) => {
                        setExtra_notes(event.target.value);
                      }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Table>
            <TableRow>        <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                              onClick={handleSubmit}
                            >
                                Save
                          </Button>
                          </TableRow>
            </Table>
          </TableContainer>
        </Grid>

      </Container>
    </ThemeProvider>
  );
  }
}
