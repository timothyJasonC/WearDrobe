export async function postRequest(data: any, segment: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${segment}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return res;
}

export async function postRequestToken(data: any, segment: string, token: string | string[]) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${segment}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return res;
}

export async function getRequestToken(segment: string, token: string | string[]) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${segment}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return res;
}

export async function getRequest(segment: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${segment}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache'
    })
    return res;
}

export async function deleteRequest(segment: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${segment}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res;
}

export async function refreshToken(id: string | undefined) {
    try {
        const res = await postRequest({ id: id }, 'account/refresh-token')
        const data = await res.json()
        const token = data.data;
        return token;
    } catch (error) {
        console.log(error)
    }
}

export async function patchRequest(data: any, segment: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}${segment}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        cache: 'no-cache',
        body: JSON.stringify(data)
    })
    return res;
}