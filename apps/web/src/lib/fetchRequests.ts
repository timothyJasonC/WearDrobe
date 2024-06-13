export async function postRequest(data: any, segment: string) {
    const res = await fetch(`http://localhost:8000/api${segment}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return res;
}

export async function postRequestToken(data: any, segment: string, token: string | string[]) {
    const res = await fetch(`http://localhost:8000/api${segment}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return res;
}

export async function getRequest(segment: string) {
    const res = await fetch(`http://localhost:8000/api${segment}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res;
}
