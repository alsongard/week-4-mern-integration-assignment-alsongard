import postData from "./postData";
import PostReader from "./postReaderComponent";
function HomePage()
{

    const content = postData.map((dataItem)=>{
        return <PostReader key={dataItem.id} item={dataItem} />
    })

    return (
        <section>
            <h1 className="text-center text-[30px] my-[20px]">TechSpace</h1>
            <div className="flex flex-col w-[1200px] py-[25px] gap-y-[20px] px-[50px] mx-auto ">
                {content}
            </div>
        </section>
    )
}

export default HomePage;