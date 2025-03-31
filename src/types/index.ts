'use server';

export interface Topic {
    $id: string;
    TopicName: string;
    TopicCategory: string;
    TopicArticles: string[];
}

export interface Article {
    $id: string;
    ArticleTitle: string;
    ArticleImage: string;
    ArticleDate: string;
    ArticleLink: string;
    ArticleAlignment: string;
}

export interface User {
    name: string;
    email: string;
}

export interface ArticleCardLgProps {
    title: string;
    image: string;
    date: string;
    sourceLink: string;
}
  