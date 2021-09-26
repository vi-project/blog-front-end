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
}

export enum Status {
    POST="POST",
    DRAFT="DRAFT",
    DELETE="DELETE"
}
