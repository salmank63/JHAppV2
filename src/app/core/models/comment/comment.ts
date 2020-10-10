export class Comment {
    Id: number;
    ReaderId: number;
    ArticleId: number;
    CommentMessage: string;
    ParentId: number;
    IsActive: boolean;
    CreatedOn: string;
    LastModifiedOn: string;
    ReaderName: string;
}
