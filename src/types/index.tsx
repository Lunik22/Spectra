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
    ArticlePaywall: boolean;
    ArticleAuthors: string[];
    ArticlePreview: string;
    ArticleTopics: string[];
    ArticleReliability: number;
    ArticleType: string;
    ArticleLanguage: string;
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
  
export interface ArticleCardXlProps {
    title: string;
    image: string;
    date: string;
    sourceLink: string;
    paywall: boolean;
    authors: string[];
    preview: string;
    topics: string[];
    reliability: number;
    type: string;
    language: string;
}

 