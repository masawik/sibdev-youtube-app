import axios from 'axios'

const YOUTUBE_API_KEY = ''

const instance = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3/',
  // baseURL: 'http://127.0.0.1:5555/',
})

export type TSearchOrder = 'date' | 'rating' | 'relevance' | 'title' | 'viewCount' | ''

type TVideoItemThumbnail = {
  url: string,
  width: number,
  height: number
}

export interface IYoutubeVideoItemResponse {
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
  }
}

export interface IVideoItem extends IYoutubeVideoItemResponse {
  views: number
}

export type TYoutubeVideoStatisticResponse = {
  kind: string,
  etag: string,
  id: string,
  statistics: {
    viewCount: string,
    likeCount: string,
    dislikeCount: string,
    favoriteCount: string
  }
}

interface IYoutubeGenericResponse {
  error?: false,
  kind: string,
  etag: string,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number
  }
}

interface IYoutubeSearchResponse extends IYoutubeGenericResponse {
  nextPageToken: string,
  regionCode: string,
  items: IYoutubeVideoItemResponse[]
}

interface IYoutubeVideosResponse extends IYoutubeGenericResponse {
  items: TYoutubeVideoStatisticResponse[]
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
  search: (query: string, maxResults?: number, order?: TSearchOrder) => Promise<IYoutubeSearchResponse | TYoutubeErrorResponse>,
  getVideoStat: (ids: Array<string>) => Promise<IYoutubeVideosResponse | TYoutubeErrorResponse>
}

export const youtubeSearchAPI: TYoutubeSearchAPI = {
  search: (query, maxResults = 12, order = '') => {
    query = encodeURIComponent(query)
    let searchParams = `&part=snippet&key=${YOUTUBE_API_KEY}&q=${query}&maxResults=${maxResults}&type=video`
    if (order) searchParams += `&order=${order}`
    return instance.get(`/search?channelType=any${searchParams}`).then(res => res.data).catch(e => e.response.data)
  },

  getVideoStat: (ids) =>{
    return instance.get(`/videos?id=${ids}&part=statistics&key=${YOUTUBE_API_KEY}`).then(res => res.data).catch(e => e.response.data)
  }
}
