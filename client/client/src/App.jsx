
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Header from './components/header'
import SignIn from './components/sign_page'
import PostPage from './components/postPage'
import Login from './components/login_page'
import {configureStore} from "@reduxjs/toolkit";
import reducerer from './store/reducer'
import {Provider} from "react-redux";
import requireAuth from './requireAuth.jsx';

const ProtectedPostPage = requireAuth(PostPage);
const store = configureStore({reducer:reducerer});
const token = localStorage.getItem('token');

if (token)
{
  store.dispatch({type: 'ON_LOGGED_IN'})
}
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<div><Header/> <Outlet/></div>}>
                <Route index element={<SignIn/>}/>
                <Route path="login" element={<Login/> }/>
                <Route path="posts" element={<ProtectedPostPage/> }/>
              </Route>
            </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
