import axios from 'axios'

interface fetcherType {
  url: string
  post?: {}
}

export const fetcher = async ({url, post}: fetcherType) => {
  try {
    if (!url) {
      return undefined
    }
    if (!post) {
      const response = await axios.get(url)
      return response.data
    } else {
      const response = await axios.post(url, post)
      return response.data
    }
  } catch (error: any) {
    throw error.response?.data ?? error.response.data.message
  }
}



