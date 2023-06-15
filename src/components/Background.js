import Grid from '@mui/material/Grid';

export default function Background(){
    const image=require("../static/mountain.jpg")
    
    return <>
    <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:`url(${image})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                     {/* <img src={require("../static/mountain.jpg")} alt="mountain" /> */}
                </Grid>
                </>
}