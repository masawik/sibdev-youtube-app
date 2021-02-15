import axios from "axios"

const API_KEY = 'AIzaSyD4oqFUtrWe9IFK0dnrOrhLTGwYeVjt2eM'

const instance = axios.create({
  // baseURL: 'https://youtube.googleapis.com/youtube/v3/',
  baseURL: 'http://127.0.0.1:5555/',
})

export type TSearchOrder = 'date' | 'rating' | 'relevance' | 'title' | 'viewCount'

type TVideoItemThumbnail = {
  url: string,
  width: number,
  height: number
}

export type TVideoItem = {
  kind: string,
  etag: string,
  id: {
    kind: string,
    videoId: string
  }
  snippet: {
    publishedAt: string,
    channelId: string,
    title: string,
    description: string,
    thumbnails: {
      default: TVideoItemThumbnail,
      medium: TVideoItemThumbnail,
      high: TVideoItemThumbnail
    },
    channelTitle: string,
    liveBroadcastContent: string,
    publishTime: string
  },
}

type TYoutubeSearchResponse = {
  error?: false,
  kind: string,
  etag: string,
  nextPageToken: string,
  regionCode: string,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number
  },
  items: TVideoItem[]
}

type TYoutubeErrorItem = {
  message: string,
  domain: string,
  reason: string
}

type TYoutubeErrorResponse = {
  error: {
    code: number,
    message: string,
    errors: TYoutubeErrorItem[]
  }
}

type TYoutubeSearchAPI = {
  search: (query: string, maxResults?: number, order?: TSearchOrder) => Promise<TYoutubeSearchResponse | TYoutubeErrorResponse>
}

//todo обработать ошибку quotaExceeded
export const youtubeSearchAPI: TYoutubeSearchAPI = {
  search: (query, maxResults = 5, order = 'relevance') => {
    query = encodeURIComponent(query)
    return instance.get(`/search?channelType=any&maxResults=${maxResults}&order=${order}&q=${query}&part=snippet&key=${API_KEY}`).then(res => res.data)
  }
}
