import type { User } from "./user.js";

export interface Card {
  _id: string;
  name: string;
  link: string;
  owner: User;
  likes: User[];
  createdAt: string;
}
