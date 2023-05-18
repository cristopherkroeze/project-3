
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AllAnimesPage from './pages/AllAnimesPage.js';
import AnimeDetailsPage from './pages/AnimeDetailsPage.js'
import EditAnimePage from './pages/EditAnimePage';
import SignupPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';

import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';

function App() {
  return (
    <div className="App" >

      <Navbar />

      <Routes>

        <Route path='/' element={<HomePage />} />


        <Route
          path="/animes"
          element={ <AllAnimesPage /> } 
        />
 
        <Route
          path="/animes/:animeId"
          element={ <AnimeDetailsPage /> }
        />
 
        {/* <Route
          path="/projects/edit/:projectId"
          element={ <IsPrivate> <EditAnimePage /> </IsPrivate> } 
        /> */}
        
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
        <Route path="/profile" element={<UserProfilePage/>}/>
        

      </Routes>

    </div>
  );
}

export default App;
