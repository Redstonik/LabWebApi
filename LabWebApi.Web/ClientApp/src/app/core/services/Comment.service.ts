// comment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { commentsUrl } from 'src/app/configs/commentController-endpoints';
import { AlertService } from './Alert.service';
import { Comment } from '../models/comment/CommentInfo';
import { CommentCreateInfo } from '../models/comment/CommentCreateInfo';

@Injectable({
  providedIn: 'root',
})
export class CommentService {

  constructor(private http: HttpClient, private alertService: AlertService) {}

  getCommentsForProduct(productId: number): Observable<Comment[]> {
    const url = `${commentsUrl}?productId=${productId}`;
    return this.http.get<Comment[]>(url).pipe(
      catchError(err => {
        this.alertService.errorAlert(err.error, 'Get Comments for Product Failed!');
        return of([]);
      })
    );
  }

  addComment(comment: CommentCreateInfo): Observable<any> {
    return this.http.post<Comment>(commentsUrl, comment).pipe(
      catchError(err => {
        this.alertService.errorAlert(err.error, 'Add Comment Failed!');
        return of({});
      })
    );
  }

  deleteComment(id: number): Observable<any> {
    const url = `${commentsUrl}/${id}`;
    return this.http.delete(url).pipe(
      catchError(err => {
        this.alertService.errorAlert(err.error, 'Delete Comment Failed!');
        return of({});
      })
    );
  }
}
