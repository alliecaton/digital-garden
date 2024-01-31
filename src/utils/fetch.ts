import axios from 'axios'

type Config = {
  method: string
  path: string
  data?: any
  headers?: any
}

export default async function fetch({ method, path, data, headers }: Config) {
  // @ts-ignore-next-line
  const token = JSON.parse(localStorage.getItem('token'))
  try {
    const res = await axios({
      method: method,
      url: import.meta.env.VITE_API_BASE + path,
      data: data,
      headers: {
        ...headers,
        ...(token && { 'x-access-token': token }),
      },
    })

    if (res.status === 200) return res.data
  } catch (e) {
    console.error(e)
  }
}
