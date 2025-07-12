import postData from "./postData";
import PostReader from "./postReaderComponent";
function HomePage()
{

    const content = postData.map((dataItem)=>{
        return <PostReader key={dataItem.id} item={dataItem} />
    })

    return (
        <section className="dark:bg-gradient-to-br bg-slate-50 dark:from-slate-700 dark:to-slate-900 mt-0s">
            <h1 className="text-center text-[30px] dark:text-white  py-[20px]">TechSpace</h1>
            <div className="flex flex-col w-[1200px] py-[25px] gap-y-[20px] px-[50px] mx-auto ">
                {content}
            </div>
        </section>
    )
}

export default HomePage;