const localServer = "http://127.0.0.1:3000"

const api = (url: string) => {
    return fetch(localServer + url).then((response) => response.json())
}

const getApi = (url: string, data: any) => {
    const queryString = Object.entries(data).map(i => `${i[0]}=${i[1]}`)
    return fetch(localServer + url + `?${queryString}`).then((response) => response.json())
}

const postApi = (url: string, data: any) => {
    return fetch(localServer + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(data)
    }).then((response) => response.json())
}

export { api, getApi, postApi };