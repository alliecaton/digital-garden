import axios from 'axios'

type Config = {
  method: string
  path: string
  data?: any
}

export default async function fetch({ method, path, data }: Config) {
  try {
    const res = await axios({
      method: method,
      url: import.meta.env.VITE_API_BASE + path,
      data: data,
    })

    if (res.status === 200) return res.data
  } catch (e) {
    console.error(e)
  }
}
