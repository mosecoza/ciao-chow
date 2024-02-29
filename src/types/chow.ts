export interface Chows {
    data: Chow[]
    meta: Meta
  }
  
  export interface Chow {
    id: number
    attributes: Attributes
  }
  
  export interface Attributes {
    Title: string
    Description: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    Image: Image
  }
  
  export interface Image {
    data: ImageData[]
  }
  
  export interface ImageData {
    id: number
    attributes: ImageAttributes
  }
  
  export interface ImageAttributes {
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    formats: Formats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: any
    provider: string
    provider_metadata: any
    createdAt: string
    updatedAt: string
  }
  
  export interface Formats {
    thumbnail: Thumbnail
    large?: Large
    medium?: Medium
    small?: Small
  }
  
  export interface Thumbnail {
    name: string
    hash: string
    ext: string
    mime: string
    width: number
    height: number
    size: number
    path: any
    url: string
  }
  
  export interface Large {
    name: string
    hash: string
    ext: string
    mime: string
    width: number
    height: number
    size: number
    path: any
    url: string
  }
  
  export interface Medium {
    name: string
    hash: string
    ext: string
    mime: string
    width: number
    height: number
    size: number
    path: any
    url: string
  }
  
  export interface Small {
    name: string
    hash: string
    ext: string
    mime: string
    width: number
    height: number
    size: number
    path: any
    url: string
  }
  
  export interface Meta {
    pagination: Pagination
  }
  
  export interface Pagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
  