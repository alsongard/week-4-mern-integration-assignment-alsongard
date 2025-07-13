import axios from "axios";
import { useState } from "react";
import clsx from "clsx";
function AdminPage()
{
    const [allPostData, setAllPostData] = useState({});
    const [displayPostData, setDisplayPostData] = useState(false);
    async function ViewAllPosts()
    {
        try
        {
            const res = await axios.get("http://localhost:5001/getAllPost");
            const {data} = res.data;
            console.log(data);
            setAllPostData(data);
            setDisplayPostData(true);
        }
        catch(err)
        {
            console.log(`Error : ${err}`);
        }
    } 
    async function DeletePost()
    {
        try
        {

        }
        catch(err)
        {
            console.log(`Error : ${err}`);
        }
    }
    const [userData, setUserData] = useState({});
    const [displayUserData, setDisplayUserData] = useState(false);

    async function ViewAllUsers()
    {
        try
        {
            const res = await axios.get("http://localhost:5001/allusers");
            const {data} = res.data;
            setUserData(data);
            setDisplayUserData(true);
        }
        catch(err)
        {
            console.log(`Error : ${err}`);
        }
    }
    function clearView()
    {
        setUserData({});
        setAllPostData({})
        setDisplayPostData(false);
        setDisplayUserData(false);
    }
    const [formUserId, setFormUserId] = useState({id: ""});
    function handleChange(event)
    {
        const {name,value} = event.target;
        console.log(`this is event.target.value : ${event.target.value}`)
        setFormUserId((prevData)=>{
            return {
                ...prevData,
                [name]: value
            }
        });
    }
    async function handleSubmit(event)
    {
        event.preventDefault();
        const id = formUserId.id;
        try
        {
            const res = await axios.get(`http://localhost:5001/getpost/${id}`);
            const {data} = res.data;
            if (data.lenght < 1)
            {
                alert(`No post found with the id : ${id}`)
            }
            else
            {
                setAllPostData(data);
                setDisplayPostData(true);
            }
        }
        catch(err)
        {
            console.log(`Error: ${err}`);
        }

    }
    return (
        <section className="w-full dark:bg-gradient-to-tr dark:from-slate-700 dark:to-slate-700">
            <div className="flex flex-row items-center justify-between  mx-auto w-[1000px]  py-[50px] ">
                <div className="flex flex-col items-center">
                    <p className="mb-2 dark:text-white text-gray-700">View all posts in the system.</p>
                    <button onClick={ViewAllPosts} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">View Posts</button>
                </div>
                <div className="flex flex-col items-center">
                    <p className="mb-2 dark:text-white text-gray-700">See a list of all registered users.</p>
                    <button onClick={ViewAllUsers} className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">View Users</button>
                </div>
                <div className="flex flex-col items-center">
                    <p className="mb-2 dark:text-white text-gray-700">Delete posts from the database.</p>
                    <button onClick={DeletePost} className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">Delete Posts</button>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <p className="mb-2 dark:text-white text-gray-700">View post based on user</p>
                <form onSubmit={handleSubmit} className="flex flex-col items-center bg-white dark:bg-slate-800 p-4 mb-[20px] rounded shadow-md space-y-2 w-[900px]">
                    <label htmlFor="userId" className="text-gray-700 dark:text-white mb-1">Enter User Id</label>
                    <input
                        type="text"
                        id="userId"
                        name="id"
                        value={formUserId.id}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                    />
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                    >
                        View Post
                    </button>
                </form>
            </div>
            {
                displayPostData && (
                    allPostData.map((dataItem)=>{
                        return (
                            <div
                                id="userposts"
                                key={dataItem._id}
                                className="my-4 px-6 py-4 border border-gray-300 rounded-lg"
                            >
                                <p className="text-[18px] mb-1">
                                    <span className="font-bold">Title: </span>{dataItem.title}
                                </p>
                                <p className="text-[18px] mb-1">
                                    <span className="font-bold">Content: </span>{dataItem.content}
                                </p>
                                <p className="text-[18px] mb-1">
                                    <span className="font-bold">Author: </span>{dataItem.author}
                                </p>
                                <p className="text-[18px] mb-1">
                                    <span className="font-bold">Excerpt: </span>{dataItem.excerpt}
                                </p>
                                <p className="text-[18px] mb-1">
                                    <span className="font-bold">View Count: </span>{dataItem.viewCount}
                                </p>
                                <p className="text-[18px] mb-1">
                                    <span className="font-bold">Published: </span>{dataItem.isPublished ? "true" : "false"}
                                </p>
                            </div>
                        )
                    })
                )
            }
            <div className="flex flex-row flex-wrap items-start ">
                {
                    displayUserData &&
                    (
                        userData.map((dataItem, index)=>{
                            return (
                                <div
                                    id="users"
                                    key={dataItem._id}
                                    className="mx-auto my-4 p-6 bg-gray-100 w-[500px]  dark:bg-slate-800 rounded shadow-[0px_0px_5px_gray] "
                                >
                                    <p className="font-semibold mb-1">User {index + 1}</p>
                                    <p className="mb-1 text-left "><span className="font-bold">Id:</span> {dataItem._id}</p>
                                    <p className="mb-1"><span className="font-bold">Email:</span> {dataItem.email}</p>
                                </div>
                            )
                        })
                    )
                }
            </div>

            <button id="myBtn" onClick={clearView} className="bg-blue-400 hover:bg-blue-800 py-[5px] px-[15px] rounded-md block mx-auto mb-[10px]">Clear</button>

        </section>
    )
}
export default AdminPage;