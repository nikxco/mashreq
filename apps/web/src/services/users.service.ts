import { MimeType } from "../common.constant";
import { User } from "../common.type";
import { HttpHeader } from "../http.contstant";
import { fromFetch, getApiBaseUrl, getApiHeaders } from "../util";

export const createUser = async (payload: any) => {
    const apiBaseUrl = getApiBaseUrl();
    const endpoint = `${apiBaseUrl}/v1/users`;
    const fetchRef = fetch(endpoint, {
        method: "PUT",
        headers: {
            [HttpHeader.CONTENT_TYPE]: MimeType.JSON,
            [HttpHeader.X_API_KEY]: 'tcgxjUQBuISPRrDuyMJ1xBaIrT6rmtD7',
        },
        body: JSON.stringify(payload),
    });
    return fromFetch<void>(fetchRef);
}

export const getAllUsers = async (
    token?: string | null,
) => {
    const apiBaseUrl = getApiBaseUrl();
    const endpoint = `${apiBaseUrl}/v1/users`;
    let headers = getApiHeaders(token);
    const fetchRef = fetch(endpoint, {
        method: "GET",
        headers,
    });

    const { body = [] } = await fromFetch<User[]>(fetchRef);
    return body;
};