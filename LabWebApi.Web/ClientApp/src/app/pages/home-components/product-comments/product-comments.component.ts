import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from 'src/app/core/services/Comment.service';
import { CommentCreateInfo } from 'src/app/core/models/comment/CommentCreateInfo';
import { UserInfo } from 'src/app/core/models/admin/UserInfo';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';
import { EventEmitterService } from 'src/app/core/services/EventEmitter.service';
import { AlertService } from 'src/app/core/services/Alert.service';



@Component({
  selector: 'app-product-comments',
  templateUrl: './product-comments.component.html',
  styleUrls: ['./product-comments.component.css']
})
export class ProductCommentsComponent implements OnInit {
  @Input() productId: number; // Вхідний параметр - ідентифікатор продукту
  comments: any[] = [];
  newCommentText: string = '';
  comment: CommentCreateInfo
  currentUser: UserInfo;

  constructor(private commentService: CommentService, 
    private authService: AuthenticationService,
    private eventEmitterService: EventEmitterService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.getCommentsForProduct(this.productId);
    this.currentUser = this.authService.currentUser as UserInfo
    console.log(this.currentUser)
    console.log(this.comments)
  }

  IsOwnerOrAdmin(user: UserInfo, commentIndex: number): boolean {
    return user.role.toString() == "Admin" || this.comments[commentIndex].user.id == this.currentUser.id
  }

  getCommentsForProduct(productId: number) {
    this.commentService.getCommentsForProduct(productId).subscribe(
      (data: any[]) => {
        console.log(data)
        this.comments = data;
      },
      (error) => {
        console.error('Помилка при отриманні коментарів:', error);
      }
    );
  }

  addComment() {
    if (this.newCommentText.trim() !== '') {
      this.comment = new CommentCreateInfo(this.newCommentText, this.currentUser.id, this.productId)
      this.commentService.addComment(this.comment).subscribe(
        (data: any) => {
          this.comments.push(data);
          this.alertService.successAlert("Successful", "Comment Added!");
          this.eventEmitterService.onComponentInvoke();
        }
      ); 
      this.newCommentText = '';
    }
  }  
  async deleteComment(commentId: number, commentIndex: number){
    const confirmed = await this.alertService.okCancalAlert(`Do you really want 
    to delete this comment?`);
    console.log(commentId)
    if (confirmed) {
      this.commentService.deleteComment(commentId).subscribe(() => {
        this.comments.splice(commentIndex, 1);
      });
    }
  }  
}
