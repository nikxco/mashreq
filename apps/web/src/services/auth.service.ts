import { MimeType } from "../common.constant";
import { HttpHeader } from "../http.contstant";
import { fromFetch } from "../util";

export const signIn = async (payload: { username: string, password: string }) => {
    const endpoint = 'http://localhost:3002/v1/auth';
    const fetchRef = fetch(endpoint, {
        method: "POST",
        headers: {
            [HttpHeader.CONTENT_TYPE]: MimeType.JSON,
            [HttpHeader.X_API_KEY]: 'tcgxjUQBuISPRrDuyMJ1xBaIrT6rmtD7',
        },
        body: JSON.stringify(payload),
    });
    const { body } = await fromFetch<{ accessToken: string }>(fetchRef);
    return body;
}

export const signOut = () => {

}