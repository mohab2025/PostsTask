export interface Values {
    title: string;
    body: string;
    userId: string;
}

export interface PostBody {
    id?: number;
    userId?: number;
    title: string;
    body: string;
}

export interface CommentType {
    postId: number;
    comment: string;
}

export interface PaginationProps {
    totalPages: number;
    setCount: (count: number) => void;
}

export interface DeletePostProps {
    postId: number;
    deleteModal: boolean;
     deleteToggle: ()=>void;   
}

export interface EditedPostProps {
    postdata:PostBody,
    editeToggle:()=>void
    editeModal :boolean
}