import React,{useEffect,useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import backendUrl from './env.js';
import Link from '@mui/material/Link';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

axios.defaults.withCredentials=true;


const defaultTheme = createTheme();
function CreateTeam(){
  const [name,setTeamName]=useState("");
  const [sms,setSm]=useState([{"id":"","fname":"","lname":""}]);
  const [scrum_master,setScrumMaster]=useState("");
  
  useEffect(() => {
    const get_data = async () => {
      try{
        const response=await axios.get(`${backendUrl}/admin/scrum_masters`);
        setSm(response.data["users"]);
      }
      catch(error){
          // alert(error.response.data["msg"] || error.response.data["detail"])
      };
    };
    console.log(sms);
    
    get_data();
  }, []);

  const handleSubmit=(event)=>{
    event.preventDefault();
    axios.post(`${backendUrl}/admin/teams`,{name,scrum_master})
    .then(response=>{window.location=`/members/${response.data["id"]}`})
    .catch(error=>alert(error.response.data["msg"] || error.response.data["detail"]))
  }
  return <Grid item key="Content" xs={12} sm={6} md={4}>
  <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                  
                    <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="team_name"
                                label="Team Name"
                                name="team_name"
                                autoComplete="team_name"
                                value={name}
                                autoFocus
                                onChange={(event)=>{setTeamName(event.target.value)}}
                            />Scrum Master
                                <Select
                                margin="normal"
                                required
                                value={scrum_master}
                                id="scrum_master"
                                name="scrum_master"
                                fullWidth
                                onChange={(event)=>{setScrumMaster(event.target.value)}}
                                autoFocus
                           >
                              {sms.map((sm) => (
            
                                    <MenuItem value={sm["id"]}>{`${sm["fname"]} ${sm["lname"]}`}</MenuItem>
                              ))}

                            </Select>
                            
                             <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Create Team
                            </Button>
                  </CardContent>
                </Card>
</Grid>
}

export default function Teams() {
  const [teams,setTeams]=useState([]);
  const [base,setBase]=useState(null);
  
  useEffect(() => {
    const role=localStorage.getItem('role');
    if(!role){
      window.location='/signin'
    }
    if(role==="admin"){  
      setBase("/members");
      axios.get(`${backendUrl}/admin/teams`)
        .then(response => {
          setTeams(response.data);
        })
        .catch(error => {
          // alert(error.response.data["msg"] || error.response.data["detail"]);
        });
    }
    else{
      setBase("/teams");
      axios.get(`${backendUrl}/app/teams`)
        .then(response => {
          setTeams(response.data);
        })
        .catch(error => {
          // alert(error.response.data["msg"] || error.response.data["detail"]);
        });
    }
}, 
  []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
       <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
          {localStorage.getItem("role")==="admin"?(<CreateTeam id={123}/>):null}             
          
          {teams.map((card) => (
             <Grid item key={card["id"]} xs={12} sm={6} md={4}>
                <Link href={`${base}/${card["id"]}`} underline="none">
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card["name"]}
                    </Typography>
                    <Typography>
                      {`This is team ${card["name"]}`} 
                    </Typography>
                  </CardContent>
                </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Container>
    </ThemeProvider>
  );
}