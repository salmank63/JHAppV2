import { Comment } from './../comment/comment';
export class ArticleListRequest {
    Id: number;
    ArticleHeading: string;
    LastModifiedOn: string;
    MiniDetail: string;
    ImageUrl: string;
    Admin: string;
    Explanation: string;
    AdminImage: string;
    AboutAdmin: string;
    ComImage: string;
    Claps: number;
    Views: number;
    SeoTitle: string;
    SeoKeywords: string;
    LstComments: Comment[];
    VideoId: string;
    IsBookmark: boolean;
}
