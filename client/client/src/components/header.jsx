import {Link, NavLink} from 'react-router-dom'
import {connect} from 'react-redux';
import { FaM, FaMoon } from 'react-icons/fa6';

function Header(props)
{
    const {darkMode, setDarkMode} = props;
    const handleBackGround = ()=>{
        console.log("backGround changer clicked!!")
        setDarkMode((prevData)=>{
            console.log(`DarkMode: ${prevData}`)
            return !prevData;
        })
    }
    return (
        <header className='flex flex-row justify-between py-[10px]  bg-gradient-to-r from-slate-900 to-slate-600 text-white '>
            <h1 className='pl-[50px]'><Link to="/">TechSpace</Link></h1>
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
                        <li><FaMoon onClick={handleBackGround}/></li>
                    </ul>
                )
            }

            {
                // isLogged == true
                props.isLoggedIn 
                &&
                (
                    <ul className='flex flex-row items-center justify-between w-[400px]  mr-[50px]'>
                        <li>
                            <NavLink 
                                to="/posts"
                                className={({isActive})=>{
                                    return isActive ?  "text-[rgb(56,230,192)] " : "text-white"
                                }}
                            >
                                Posts
                            </NavLink>
                        </li>
                        <li>Profile</li>
                        <li><FaMoon onClick={handleBackGround} /></li>
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