import DevStandUpDetail from './DevStandUpDetail.js'
import SmStandUpDetail from './SmStandUpDetail.js'; 

export default function StandUpDetail() {
    const role=localStorage.getItem("role");
    
    if(role==="DEV"){
        return <DevStandUpDetail />
    }
    else if(role==="SM"){
        return  <SmStandUpDetail/>
    }
    else{
        return <>Admin</>
    }
};