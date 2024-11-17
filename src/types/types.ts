export interface Blog {
    author: string;
    content: string;
    createdAt: string;
    id: number;
    slug: string;
    title: string;
    topics: string[];  // Array of topics (tags or categories)
}
