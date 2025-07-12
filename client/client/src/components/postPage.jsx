import {useState} from "react";
// import TagInput from "./tagInput";

export default function PostPage()
{
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
    function handleSubmit(event)
    {
        event.preventDefault();
        console.log(postData);
    }
    const [tags, setTags] = useState([]);
    return (
        <section className='w-full bg-slate-950'>
            <h1 className="text-black">Welcome back user : {username} </h1>
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-2xl mx-auto bg-slate-800 p-6 rounded-lg shadow-md space-y-4">
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

                <div className="flex items-center justify-between">
                    <label className="text-gray-700 dark:text-gray-300" htmlFor="isPublished">Published</label>
                    <input  type="checkbox" name="published" checked={postData.published}  onChange={handleChange} id="isPublished" className="w-5 h-5 text-blue-600" />
                </div>

                <input type="submit" value="Submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md cursor-pointer transition duration-200" />
            </form>

        </section>
    )
}
/*


*/