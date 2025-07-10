import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux';


function Header(props)
{
    return (
        <header className='flex flex-row justify-between py-[10px]  bg-gradient-to-r from-slate-900 to-slate-600 text-white '>
            <h1>TechBlog</h1>
            {
                !props.isLoggedIn &&
                (
                    <ul className='flex flex-row justify-between w-[400px]  mr-[50px]'>
                        <li>
                            <NavLink 
                                className={({isActive})=>{
                                    return isActive ? "text-white" : "text-black"
                                }} 
                                to ="/"
                            >
                                    Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/signin"
                                className={({isActive})=>{
                                    return isActive ? "text-white"  :"text-black" 
                                }}
                            >
                                Sign Up
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/login"
                                className={({isActive})=>{
                                    return isActive ? "text-white" : "text-black"
                                }}
                            >
                                Login
                            </NavLink>
                        </li>
                    </ul>
                )
            }

            {
                // isLogged == true
                props.isLoggedIn 
                &&
                (
                    <ul className='flex flex-row justify-between w-[400px]  mr-[50px]'>
                        <li><NavLink to="/posts">Posts</NavLink></li>
                        <li>Profile</li>
                    </ul>
                )
            }
            
        </header>
    )
}
const mapStateToProps = (state)=>{
    return {isLoggedIn: state.isLoggedIn}
}
export default connect(mapStateToProps)(Header);