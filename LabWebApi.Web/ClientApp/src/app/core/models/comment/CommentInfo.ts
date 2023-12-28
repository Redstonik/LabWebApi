import { UserInfo } from "../admin/UserInfo";

export class Comment {
  id: number;
  text: string;
  User: UserInfo;
  productId: number;
}
  