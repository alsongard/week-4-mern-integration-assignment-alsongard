
import {NavLink} from 'react-router-dom'

function Header()
{
    return (
        <header className='flex flex-row justify-between py-[10px]  bg-gradient-to-r from-slate-900 to-slate-600 text-white '>
            <h1>TechBlog</h1>
            <ul className='flex flex-row justify-between w-[400px]  mr-[50px]'>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/signin">SignIn</NavLink></li>
            </ul>
            
        </header>
    )
}

export default Header;