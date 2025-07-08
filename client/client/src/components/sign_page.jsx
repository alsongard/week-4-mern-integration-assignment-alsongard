import {useState} from 'react';
import { FaUser } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import axios from "axios";



const PASSWD_REGEX=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,32}$/;
export default function SignIn()
{
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
            useremail: "",
            userpassword: "",
            confirmPassword: ""
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

    // validation check
    const [blurItems, setBlurItems] = useState({});
    function handleBlur(event)
    {
        const {name} = event.target;
        setBlurItems((prevData)=>{
            return {
                ...prevData,
                [name] : true
            }
        })
    }
    // in the below you only use the first value: only the if for future processing 
    const password_not_valid = blurItems.userpassword ?  PASSWD_REGEX.test(formData.userpassword) : "";
    const password_match = blurItems.confirmPassword ? formData.userpassword === formData.confirmPassword : "";
    
    // in using conditions both must be met: false and true : then later set to true: conditional rendering
    const errMsg = {
        password_check_err : !password_not_valid && blurItems.userpassword ? "The password should have 8 to 32 characters and contain atleast 1 uppercase,lowercase,number and special character." : "",
        password_not_match_err: !password_match && blurItems.confirmPassword ? "Password do not match try again" : ""
    }
    
    async function handleSubmit(event)
    {
        event.preventDefault();
        console.log(blurItems);
        await axios.post("http://localhost:5001/register", formData)
            .then((res)=>{
                console.log(res);
                return res;
            })
            .then((res)=>{
                console.log("This is res.data");
                console.log(res.data);
                navigate("/login");
            })
            .catch((err)=>{console.log(`Error: ${err}`)})
        
    }
    return (
        <section className='bg-slate-700 h-full py-[140px] '>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col w-1/4 mx-auto   bg-black py-[20px] px-[25px] rounded-lg '
            >
                <h1 className='text-2xl font-bold text-center mb-4 text-white'>Sign In</h1>
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
                        onBlur={handleBlur}
                    />
                </div>
                {!password_not_valid && (<p className='text-blue-800'>{errMsg.password_check_err}</p>)}
                <div className='flex flex-row gap-x-[10px] items-center border-2 border-gray-500 rounded-xl p-2 mb-4 bg-black'>
                    <RiLockPasswordFill className="text-white"/>
                    <input
                        type="password"
                        name='confirmPassword'
                        placeholder='Confirm Password..'
                        className="bg-black text-white outline-none w-full"
                        onChange={handleChange}
                        value={formData.confirmPassword}
                        required
                        onBlur={handleBlur}
                    />
                </div>
                {
                    !password_match && (<p className='text-blue-800'>{errMsg.password_not_match_err}</p>)
                }
                <input
                    type='submit'
                    value='submit'
                    className='bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors'
                />
            </form>


        </section>
    )
}