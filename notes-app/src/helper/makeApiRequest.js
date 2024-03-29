import axios from "axios";

export default async function makeApiRequest({ method, url, body, token }) {

    const response = await axios({
        method: method,
        url: url,
        data: body,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).catch((err) => { return err.response });
    return response;
}