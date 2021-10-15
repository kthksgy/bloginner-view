import { User } from "./user";

export interface Article {
  id: string;
  username: string;
  title: string;
  overview: string;
  thumbnail: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}