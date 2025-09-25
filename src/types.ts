

export interface ListApiResponse {
    list: Article[];
}

export interface ArticleImage {
    large: string;
    medium: string;
    small: string;
    alt: string;
    title: string;
}

export interface Article {
    id: string;
    firstname: string;
    surname: string;
    sex: 'm' | 'f';
    personal_code: string; 
    phone: string;
    image: ArticleImage;
    title: string;
    intro: string;
    body: string;
    images: ArticleImage[];
    tags: string[];
}