export const BACKEND_HOST =
    process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BACKEND_HOST : 'http://localhost:8000';

export async function post(path: string, data: any): Promise<any> {
    const url = `${BACKEND_HOST}${path}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
        redirect: 'follow',
    });
    return await response.json();
}