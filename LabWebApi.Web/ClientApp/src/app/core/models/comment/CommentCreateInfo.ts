export class CommentCreateInfo {
    constructor(
        public text: string,
        public userId: string,
        public productId: number
      ) {}
  }