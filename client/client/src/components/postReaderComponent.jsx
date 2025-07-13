function PostReader(props)
{
    return (
        <div className="flex flex-row gap-x-[50px]">
            <img className="h-[300px] w-[500px] rounded-md" src={props.item.image}/>
            <div className="flex-[400px_0_0] dark:text-white">
                <h1>{props.item.title}</h1>
                <p>{props.item.text}</p>
            </div>
        </div>
    )
}

export default PostReader;
