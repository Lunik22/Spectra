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
    ArticlePayWall: boolean;
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
    $id: string;
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

export interface Bookmarks {
    $id: string;
    UserSavedArticles: string[];
}

export interface FollowedTopics {
    $id: string;
    UserFollowedTopics: string[];
}

export interface FollowedSources {
    $id: string;
    UserFollowedSources: string[];
}

export interface Source {
    $id: string;
    SourceName: string;
    SourceLinks: string[];
    SourceAltImg: string;
    SourceLogo: string;
    SourceAlignment: string;
}
 
export interface FollowedTopic {
    $id: string;
    TopicName: string;
    TopicCategories: string;
    TopicArticles: string[];
}

export interface FollowedSource {
    $id: string;
    SourceName: string;
    SourceLinks: string[];
    SourceAltImg: string;
    SourceLogo: string;
    SourceAlignment: string;
}