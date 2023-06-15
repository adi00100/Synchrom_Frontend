import React,{useState,useEffect} from 'react';
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
import axios from 'axios';
import backendUrl from './env.js';
import TextField from '@mui/material/TextField';

axios.defaults.withCredentials=true;

export default function BasicTable() {
    const [newPosition,setNewPosition]=useState('');
    const [positions,setPositions]=useState([]);
      
    useEffect(() => {
        const get_data = async () => {
            try{
                const response=await axios.get(`${backendUrl}/admin/positions`);
                setPositions(response.data["positions"]);
              }
              catch(error){
                  // alert(error.response.data["msg"] || error.response.data["detail"])
              };
          

        };
        
        get_data();
      }, []);
    

    const handleSubmit=()=>{
        axios.post(`${backendUrl}/admin/positions`,{"name":newPosition})
        .then(response=>window.location.reload())
        .catch(error=>alert(error.response.data["msg"] || error.response.data["detail"]))
    }
    
  return (
    <Grid item key="Content" xs={12} sm={6} md={4}>
    <Container sx={{ py: 8 }} maxWidth="md" align="center">
    {/* End hero unit */}
    <Grid container spacing={4}>
    
    <TableContainer component={Paper}>
 
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          
            <TableCell align="left">
                <Typography gutterBottom variant="h8" component="h2">
                    Positions
                </Typography>    
          </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {positions.map((position) => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {`${position["name"]}`}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            
          <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="new_position"
                                label="New Position"
                                name="new_position"
                                autoComplete="new_position"
                                autoFocus
                                value={newPosition}
                                onChange={(event)=>{setNewPosition(event.target.value)}}
                            />
                            <></>
        </TableRow>
        <TableRow>
        <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                              onClick={handleSubmit}
                            >
                                Add Position
                          </Button>
                        
        </TableRow>
        </TableBody>
      </Table>
      
    </TableContainer>
    </Grid>
    </Container>
    </Grid>
  );
}
