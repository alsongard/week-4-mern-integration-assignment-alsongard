
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Header from './components/header'
import SignIn from './components/sign_page'
import PostPage from './components/postPage'
import Login from './components/login_page'
function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<div><Header/> <Outlet/></div>}>
              <Route index element={<SignIn/>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="posts" element={<PostPage/>}/>
            </Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
