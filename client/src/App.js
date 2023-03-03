import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Container} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { AuthProvider } from './context/auth';
import ProtectedRoutes from './util/ProtectedRoutes';


import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Container>
          <MenuBar/>
          <Routes>

            <Route exact path='/' element={<Home/>}/>

            <Route element={<ProtectedRoutes/>}>
              <Route exact path='/login' element={<Login/>}/>
              <Route exact path='/register' element={<Register/>}/>
            </Route> 
            <Route exact path='/posts/:postId' element={<SinglePost/>}/>
          </Routes>
        </Container>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
