import backendUrl from './env.js';
import axios from 'axios';
axios.defaults.withCredentials=true;

export default function Logout() {
    const logout=()=>{
        axios.post(`${backendUrl}/auth/logout`,{},{withCredentials:true})
        .then(response=>{
            console.log(response.data);
            localStorage.clear()
            window.location="/"
        })
        .catch(error=>{
            alert(error.response.data["detail"] || error.response.data["msg"]);
            localStorage.clear()
            window.location="/"
        });
    };
    return (
            <>
                {logout()}       
            </>
    );
}