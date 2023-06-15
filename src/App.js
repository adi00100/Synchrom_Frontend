import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Teams from './components/Teams.js';
import StandUp from './components/StandUp.js'
import Logout from './components/Logout.js'
import StandUpDetail from './components/StandUpDetail.js'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CreateStandUp from './components/CreateStandUp.js';
import Members from './components/Members.js'
import Appbar from './components/AppBar.js'
import Positions from './components/Positions.js'

function App() {
  return (

      
    <>
        <Router>
          <Routes>
            <Route path="/" element={<><Appbar/><Teams/></>} />
            <Route path="/standup/create/:id" element={<><Appbar/><CreateStandUp/></>} />
            <Route path="/members/:id" element={<><Appbar/><Members/></>} />
            <Route path="/positions" element={<><Appbar/><Positions/></>}/>
            <Route path="/teams/:id" element={<><Appbar/><StandUp/></>} />
            <Route path="/standup/:id" element={<><Appbar/><StandUpDetail/></>} />
            
            <Route  path="/signin" element={<SignIn/>} />
            <Route  path="/logout" element={<Logout/>} />
            <Route  path="/signup" element={<SignUp/>} />
          </Routes>
        </Router>
        </>
      );
}

export default App;
