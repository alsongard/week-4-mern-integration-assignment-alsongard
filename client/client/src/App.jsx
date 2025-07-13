
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Header from './components/header'
import SignIn from './components/sign_page'
import PostPage from './components/postPage'
import Login from './components/login_page'
import {configureStore} from "@reduxjs/toolkit";
import reducerer from './store/reducer'
import {Provider} from "react-redux";
import requireAuth from './requireAuth.jsx';
import { useState } from 'react'
import HomePage from './components/homePage.jsx'
import AdminPage from './components/adminPage.jsx'


const ProtectedPostPage = requireAuth(PostPage);
const store = configureStore({reducer:reducerer});
const token = localStorage.getItem('token');

if (token)
{
  store.dispatch({type: 'ON_LOGGED_IN'})
}
function App() {

  const [darkMode, setDarkMode] = useState(false);
  const bg = darkMode ? 'dark' : '';
  console.log(`bg: ${bg}`)
  return (
    <div className={`${bg} h-full`}>
      <Provider store={store}>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<div><Header darkMode={darkMode} setDarkMode={setDarkMode}/> <Outlet/></div>}>
                <Route index element={<HomePage/>}/>
                <Route path="signin" element={<SignIn/>}/>
                <Route path="login" element={<Login/> }/>
                <Route path="posts" element={<ProtectedPostPage/> }/>
                <Route path="admin" element={<AdminPage/>}/>
              </Route>
            </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
