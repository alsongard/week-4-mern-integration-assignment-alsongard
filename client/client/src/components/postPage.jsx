export default function PostPage()
{
    const username = localStorage.getItem("username");
    return (
        <section>
            <h1 className="text-black">Welcome back user : {username} </h1>
        </section>
    )
}