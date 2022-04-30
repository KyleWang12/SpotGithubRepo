import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import Entries from "./components/Entries";
import RepoEntry from './components/RepoEntry';
import Header from './components/Header';

function App() {

  const [userName, setUserName] = useState(null);

  useEffect(() => {
    document.title = "SpotRepo"
    Axios.get('/api/user/isLoggedIn')
      .then(response => setUserName(response.data.userName))
      .catch(error => console.log("User is not logged in"));
  }, [])

  function logout() {
    Axios.post('/api/user/logout')
      .then(res => setUserName(null))
      .catch(error => console.log(error))
  }


  return (
    <BrowserRouter>
      <Header userName={userName} logout={logout} />
      <Routes>
        <Route path={"/repos"} element={<Entries userName={userName} />} />
        <Route path={"/repos/:repoId"} element={<RepoEntry userName={userName} />} />
        <Route path={"/*"} element={<Navigate to='/repos' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
