export interface Article {
   id: number;
   title: string;
   subtitle: string;
   description: string;
   imageUrl: string;
   author: string;
   createdAt?: string; // ISO format
   updatedAt?: string; // ISO format
}
