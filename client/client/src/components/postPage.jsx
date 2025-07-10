import {useState} from "react";

export default function PostPage()
{
    const username = localStorage.getItem("username");
    const [postData, setPostData] = useState({});


    return (
        <section>
            <h1 className="text-black">Welcome back user : {username} </h1>

            <form>
                
            </form>
        </section>
    )
}