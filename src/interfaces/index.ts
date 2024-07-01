
export interface IUser {
    name: string
    last_name: string
    email: string
    image_url: string
    _id: string
    createdAt: string
    updatedAt: string
    __v: number
}

export interface IUserPostBody {
    name: string	
    last_name: string
    email: string
    image_url: string
}

export interface IUserUpdateBody {
    name?: string	
    last_name?: string
    email?: string
    image_url?: string
}

export interface IUserPostResponse{
    response: IUser
    message: string
}