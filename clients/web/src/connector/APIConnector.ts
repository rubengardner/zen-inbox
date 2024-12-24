export const BACKEND_HOST = 'http://localhost:9000/';

export async function post(path: string, data: any): Promise<any> {
    const url = `${BACKEND_HOST}${path}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        redirect: 'follow',
    });
    return await response.json();
}