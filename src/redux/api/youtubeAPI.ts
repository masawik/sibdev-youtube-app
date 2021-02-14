import axios from "axios"

const API_KEY = 'AIzaSyD4oqFUtrWe9IFK0dnrOrhLTGwYeVjt2eM'

const instance = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/',
})

type TSearchOrder = 'date' | 'rating' | 'relevance' | 'title' | 'viewCount'

type TYoutubeSearchAPI = {
  search: (query: string, maxResults?: number, order?: TSearchOrder) => Promise<TSearchResponse>
}

type TVideoItemThumbnail = {
  url: string,
  width: number,
  height: number
}

type TVideoItem = {
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
    }
  },
  channelTitle: string,
  liveBroadcastContent: string,
  publishTime: string
}

type TSearchResponse = {
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

export const youtubeSearchAPI: TYoutubeSearchAPI = {
  search: (query, maxResults = 5, order = 'relevance') => {
    query = encodeURIComponent(query)
    return instance.get(`/search?channelType=any&maxResults=${maxResults}&order=${order}&q=${query}&part=snippet&key=${API_KEY}`).then(res => res.data)
  }
}
