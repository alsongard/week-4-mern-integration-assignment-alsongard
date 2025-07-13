import {useState} from "react";
import clsx from "clsx";
import axios from "axios";
// import TagInput from "./tagInput";

export default function PostPage()
{
    const user_id = localStorage.getItem('user_id');

    const username = localStorage.getItem("username");
    const [postData, setPostData] = useState({
        title: "",
        content: "",
        file: "",
        excerpt: "",
        category: "",
        tags: "",
        published: true
    });
    
    function handleChange(event)
    {
        const {value, name, type, checked} = event.target;
        setPostData((prevData)=>{
            return {
                ...prevData, 
                [name]: type === "checkbox" ? checked : value
            }
        })
    
    }
    const [dipslaySlug, setDisplaySlug] = useState(false); 
    function generateSlug()
    {
        const title = postData.title;
        let newString = title.replace(/\s/g, "-");
        newString = newString.toLowerCase();
        console.log(newString);
        setPostData((prevData)=>{
            return {
                ...prevData,
                slug: newString,
                author: user_id
            }
        })
        setDisplaySlug(true);
        console.log(postData)

    }
    const [displayCreateForm, setDisplayCreateForm] = useState(false);
    function genCreateForm()
    {
        setDisplayCreateForm((prevBool)=>{ console.log(prevBool); return !prevBool});

    }
    const [userPost, setUserPost] = useState({});
    const [displayPost, setDisplayPost] = useState(false);
    async function GetUserPosts()
    {
        try
        {
            const res = await axios.get(`http://localhost:5001/getpost/${user_id}`);
            console.log(res);
            const {data} =  res.data
            console.log(data);
            setUserPost(data);
            setDisplayPost((prevBool)=>{return !prevBool});
        }
        catch(err)
        {
            console.log(`Error : ${err}`)
        }
    }
    function ClearView()
    {
        setPostData({
            title: "",
            content: "",
            file: "",
            excerpt: "",
            category: "",
            tags: "",
            published: true
        });
        setDisplayCreateForm(false);
        setDisplayPost(false);
    }
    async function handleSubmit(event)
    {
        event.preventDefault();
        setPostData((prevData)=>{
            return {
                ...prevData,
                author: user_id
            }
        })
        try
        {

            const res = await axios.post("http://localhost:5001/createpost", postData);
            console.log(res);
            const {data} = res.data;
            console.log(`this is data : \n ${data}`);
            setUserPost(data);
            setDisplayPost(true);
        }
        catch(err)
        {
            console.log(`Error: ${err}`);
        }
    }
    const [tags, setTags] = useState([]);
    return (
        <section className='w-full bg-slate-950  pb-[20px] text-white'>
            <h1 className=" text-white text-center text-2xl pt-[25px]">Welcome back user : {username.toUpperCase()} </h1>
            <div className='w-[1000px] mx-auto my-[30px] flex flex-col gap-y-[20px]'>
                <p className='text-white text-[18px]'>Click the button below to create a post</p>
                <button onClick={genCreateForm} className='text-white bg-cyan-600 py-[2.5px] px-[15px] rounded-md'>Create Post</button>
                <p className='text-white text-[18px]'>Click the button below to view your posts</p>
                <button onClick={GetUserPosts} className='dark:text-white bg-cyan-600 py-[2.5px] px-[15px] rounded-md'>View Post</button>
            </div>
            
            <form onSubmit={handleSubmit} className={clsx(displayCreateForm ? "flex flex-col w-full max-w-2xl mx-auto bg-slate-800 p-6 rounded-lg shadow-md space-y-4": "hidden")}>
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">Create a New Blog Post</h2>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="title">Title</label>
                    <input name="title" value={postData.title} onChange={handleChange} type="text" id="title" placeholder="Enter title"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-700 dark:text-white" />
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="content">Content</label>
                    <textarea  name="content" value={postData.content} onChange={handleChange} id="content" rows="5" placeholder="Write your content..."
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-700 dark:text-white"></textarea>
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="image">Image</label>
                    <input name="file" value={postData.file} onChange={handleChange} type="file" id="image"
                    className="w-full border rounded-md px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer dark:bg-slate-700 dark:text-white" />
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="excerpt">Excerpt</label>
                    <input name="excerpt" value={postData.excerpt} onChange={handleChange} type="text" id="excerpt" placeholder="Brief summary"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-700 dark:text-white" />
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="category">Category</label>
                    <input name="category" value={FormData.category} onChange={handleChange} type="text" id="category" placeholder="e.g. Tech, Tutorials"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-700 dark:text-white" />
                </div>

                <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="tags">Tags</label>
                    <input name="tags" value={postData.tags} onChange={handleChange} type="text" id="tags" placeholder="e.g. #React #Tailwind"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-700 dark:text-white" />
                </div>

                <button  onClick={generateSlug} type="button" className="bg-slate-600 hover:bg-blue-700 w-[200px] text-white font-semibold py-2 px-4 rounded-md cursor-pointer transition duration-200">
                    Generate Slug
                </button>
                {
                    dipslaySlug && (<p>{postData.slug}</p>)
                }
                <div className="flex items-center justify-between">
                    <label className="text-gray-700 dark:text-gray-300" htmlFor="isPublished">Published</label>
                    <input  type="checkbox" name="published" checked={postData.published}  onChange={handleChange} id="isPublished" className="w-5 h-5 text-blue-600" />
                </div>
                <input type="submit" value="Submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md cursor-pointer transition duration-200" />
            </form>
            {
                displayPost && 
                (
                    userPost.map((dataItem)=>{
                        return (
                            <div key={dataItem._id} className='block w-[1000px] mx-auto py-[25px] px-[25px]  my-[50px] rounded-md border-2 border-white'>
                                <h2>User Post Data</h2>
                                <p className='text-white text-[17px]'><span className="font-bold block">Title:</span> {dataItem.title}</p>
                                <p className='text-white text-[17px]'><span className="font-bold block">Content:</span> {dataItem.content}</p>
                                <p className='text-white text-[17px]'><span className="font-bold block">ViewCount:</span> {dataItem.viewCount}</p>
                                <p className='text-white text-[17px]'><span className="font-bold block">Excerpt:</span>{dataItem.excerpt}</p>
                                <p className='text-white text-[17px]'><span className="font-bold block">Published:</span>{dataItem.ispublished}</p>
                            </div>
                        )
                    })
                )
            }
            <button onClick={ClearView} className="bg-blue-600 block hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md cursor-pointer transition duration-200  mt-[25px]  mx-auto">Clear View</button>
        </section>
    )
}
