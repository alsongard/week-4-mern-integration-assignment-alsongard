import axios from "axios";

function SetAuthorizationHeader(token)
{
    // will be used for setting the headers with Authorization token
    if (token)
    {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
}

export default SetAuthorizationHeader;