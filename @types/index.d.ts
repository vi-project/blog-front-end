export interface Article {
    id: string
    title: string
    content: string
    browser: number
    created_at: Date
    category: Category
    tags: Tag[]
    description: string
    cover: string
    status: Status
}


export interface Category {
    id: number
    name: string
    key: string
}

export interface Tag {
    id: number
    key: string
    name: string
    articleNum: number
}

export enum Status {
    POST="POST",
    DRAFT="DRAFT",
    DELETE="DELETE"
}


export interface I_Tag {
    name: string
    key: string
}

export interface I_Category {
    id: number
    name: string
    key: string
    articles: Article[]
}


export interface IArticleDetail {
    [key : string] : any
}

export interface I_ArticleProps {
    article?: IArticleDetail
    error?: any
}

export interface I_BaseList {
    data: Article[]
    count: number
    page: number
    id?: number

    category?: I_Category
}
