import React,{useState,useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import {useParams} from 'react-router-dom';
import backendUrl from './env.js'
import axios from 'axios';
import Button from '@mui/material/Button';

axios.defaults.withCredentials=true;

const defaultTheme = createTheme();
function CreateStandUp(props){
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
                  <Link href={`/standup/create/${props.id}`} underline="none">
  
                  <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                              Create<br/> Stand Up <br/>card
                    </Button>
                    </Link>

                  </CardContent>
                </Card>
</Grid>
}
export default function StandUp(props) {
  const {id}=useParams(); 
  const week_days=["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
  const [cards,setCards]=useState([])  
  useEffect(()=>{
    axios.get(`${backendUrl}/app/standup/${id}`)
    .then(response=>setCards(response.data))
    .catch(error=>alert(error.response.data["msg"] || error.response.data["detail"] ));
  },[]);
  const getDay=(date)=>{
    const date_part=date.split('-');
    const day=(new Date(date_part[0],date_part[1],date_part[2])).getDay();
    return week_days[day-1];
}
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
          

                    {localStorage.getItem("role")==="SM"?(<CreateStandUp id={id}/>):null}             
                
          {cards.map((card) => (
             <Grid item key={card["id"]} xs={12} sm={6} md={4}>
                <Link href={`/standup/${card["id"]}`} underline="none">
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
                  {getDay(card["date"])}
                    </Typography>
                    
                    <Typography gutterBottom variant="h5" component="h2">
                      {card["date"]}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card["release_cycle"]}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card["sprint_id"]}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                      {`${card["extra_notes"].slice(0,100)}...`}
                    </Typography>
                    
                  </CardContent>
                </Card>
                </Link>
              </Grid>
            ))}

          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}