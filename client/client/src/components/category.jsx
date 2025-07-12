import { useState } from "react"

export default function FormCategory()
{
    const [categoryData, setCategoryData] = useState({
        category_name: ""
    })
    const handleChange = (event)=>{
        setCategoryData(event.target.value);
    }
    function handleSubmit(event)
    {
        event.preventDefault();
        console.log(categoryData);
    }
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label htmlFor="category">Category</label>
                <select name="category" onChange={handleChange}>
                    <option selected>---</option>
                    <option vlaue="technology">Technology</option>
                    <option vlaue="health">Health</option>
                    <option vlaue="sports">Sports</option>
                    <option vlaue="space">space</option>
                </select>
                <input type="submit" value="submit"/>
            </form>
        </section>
    )
}