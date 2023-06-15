import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import backendUrl from './env.js';

axios.defaults.withCredentials=true;

export default function BasicTable() {
    const [users,setUsers]=useState([])
    const [newMembers,setNewMembers]=useState([]);
    const [developers,setDevelopers]=useState([]);
    const [positions,setPositions]=useState([]);
    const {id}=useParams();
      
    useEffect(() => {
        const get_data = async () => {
            try{
                const response=await axios.get(`${backendUrl}/admin/members/${id}`);
                setUsers(response.data);
              }
              catch(error){
                  // alert(error.response.data["msg"] || error.response.data["detail"])
              };
            try{
            const response=await axios.get(`${backendUrl}/admin/list_devs`);
            setDevelopers(response.data);
          }
          catch(error){
              // alert(error.response.data["msg"] || error.response.data["detail"])
          };
        
        try{
            const response=await axios.get(`${backendUrl}/admin/positions`);
            setPositions(response.data["positions"]);
          }
          catch(error){
              // alert(error.response.data["msg"] || error.response.data["detail"])
          };
        };
        
        console.log(developers);
        console.log(positions)
        get_data();
      }, []);
    
    const addMember=()=>{
        let temp=[...newMembers];
        temp.push({"member_id":"","position":""});
        setNewMembers(temp);
    }
    const removeMember=()=>{
        let temp=[...newMembers];
        temp.pop();
        setNewMembers(temp);
    }
    const handleSubmit=()=>{
            const data={
                "team_id":id,
                "members":newMembers
            }
            console.log(data)
            axios.post(`${backendUrl}/admin/members`,data)
            .then(response=>{window.location=`/members/${id}`})
            .catch(error=>{alert(error.response.data["msg"]||error.response.data["detail"])})
    }
    const setUser=(value,index)=>{
        let temp=[...newMembers];
        temp[index]["member_id"]=value;
        setNewMembers(temp);
    }
    const setPosition=(value,index)=>{
        let temp=[...newMembers];
        temp[index]["position"]=value;
        setNewMembers(temp);
    }
    
  return (
    <Container sx={{ py: 8 }} maxWidth="md" align="center">
    {/* End hero unit */}
    <Grid container spacing={4}>
    
    <TableContainer component={Paper}>
 
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          
            <TableCell align="left">
                <Typography gutterBottom variant="h8" component="h2">
                    Member
                </Typography>    
          </TableCell>
            <TableCell align="left"><Typography gutterBottom variant="h8" component="h2">
                Role</Typography></TableCell>
            <TableCell align="left"><Typography gutterBottom variant="h8" component="h2">
                Position</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {`${user["fname"]} ${user["lname"]}`}
              </TableCell>
              <TableCell align="left">{user["role"]}</TableCell>
              <TableCell align="left">{user["position"]}</TableCell>
            </TableRow>
          ))}
          {newMembers.map((user,index) => (
            <TableRow

              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Select
                                margin="normal"
                                required
                                value={newMembers[index]["member_id"]}
                                id="developer"
                                name="developer"
                                fullWidth
                                onChange={(event)=>{setUser(event.target.value,index)}}
                                autoFocus
                           >
                              {developers.map((sm) => (
                                    <MenuItem value={sm["id"]}>{`${sm["fname"]} ${sm["lname"]}`}</MenuItem>
                              ))}

                            </Select>                 
              </TableCell>
              <TableCell align="left">DEV</TableCell>
              <TableCell align="left"><Select
                                margin="normal"
                                required
                                value={newMembers[index]["position"]}
                                id="scrum_master"
                                name="scrum_master"
                                fullWidth
                                onChange={(event)=>{setPosition(event.target.value,index)}}
                                autoFocus
                           >
                              {positions.map((sm) => (
                                    <MenuItem value={sm["id"]}>{sm["name"]}</MenuItem>
                              ))}

                            </Select></TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
      <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                              onClick={addMember}
                            >
                                Add New Member
                          </Button>
                          <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                              onClick={removeMember}
                            >
                                Remove New Member
                          </Button>
      
                          <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                              onClick={handleSubmit}
                            >
                                Save
                          </Button>
      
    </TableContainer>
    </Grid>
    </Container>
  );
}
