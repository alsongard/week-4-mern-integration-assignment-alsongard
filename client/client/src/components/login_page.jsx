import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import setAuthorizationHeader from "../utils/setAuthHeader";
import axios from "axios";
import { connect } from "react-redux"

function Login(props)
{
    const navigate = useNavigate();
    const [formData, setFormData] =  useState({
        useremail: "",
        userpassword:""
    });
    
    function handleChange(event)
    {
        const {name, value} = event.target;
        setFormData((prevData)=>{
            return {
                ...prevData,
                [name]:value
            }
        })
    };

    const [errOnLogin, setErrOnLogin] = useState(false);
    async function handleSubmit(event)
    {
        event.preventDefault();
        console.log(formData);
        console.log("clicked");
        await axios.post("http://localhost:5001/login", formData)
            .then((res)=>{
                console.log(res);
                return res;
            })
            .then((resData)=>{
                const {success, data} = resData.data;
                if (success == true)
                {
                    localStorage.setItem("token", data);
                    setAuthorizationHeader(data);
                    const {email, user_id} = resData.data;
                // console.log(email, user_id); testing working correctly
                    const myEmail = email.split("@")[0];
                    localStorage.setItem('username',myEmail);
                    localStorage.setItem('user_id',user_id);
                    props.onLoggedIn()
                    navigate("/posts");

                }
                else
                {
                    setErrOnLogin(true);
                }
            })
            .catch((err)=>{
                setErrOnLogin(true);
                console.log(`Error : ${err}`);
            })
    }
    return (
        <section className='bg-slate-700 h-full py-[140px] '>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col w-1/4 mx-auto   bg-black py-[20px] px-[25px] rounded-lg'
            >
            <div className='flex flex-row gap-x-[10px] items-center border-2 border-gray-500 rounded-xl p-2 mb-4 bg-black'>
                <FaUser className="text-white"/>
                <input
                    type="text"
                    name="useremail"
                    placeholder='Email..'
                    className="bg-black text-white outline-none w-full"
                    value={formData.useremail}
                    onChange={handleChange}
                    required
                />
                </div>
                <div className='flex flex-row gap-x-[10px] items-center border-2 border-gray-500 rounded-xl p-2 mb-4 bg-black'>
                    <RiLockPasswordFill className="text-white"/>
                    <input
                        type="password"
                        name='userpassword'
                        placeholder='Password..'
                        className="bg-black text-white outline-none w-full"
                        onChange={handleChange}
                        value={formData.userpassword}
                        required
                    />
                </div>
                <input type="submit" value="submit" className='bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors'  />
                {
                    errOnLogin && 
                    (
                        <p className='text-blue-800 my-[10px]'>Invalid credentials try again with the correct credentials</p>
                    )
                }
            </form>
        </section>
    )
}

const mapDispatchToProps = (dispatch)=>{
    return {
        onLoggedIn: ()=>dispatch({type:"ON_LOGGED_IN"})
    }
}

export default connect(null, mapDispatchToProps)(Login);