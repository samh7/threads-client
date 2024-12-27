import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StateService } from './state.service';
import { User } from '../interfaces/user.interface';
import { api_url, user_url } from '../../config/environment';
import { Comment } from '../interfaces/comment.interface';

type CreateCommentDto = {
  parentId?: string;
  text: string;
  userId: string;
}


@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  http = inject(HttpClient)
  withCredentials = {
    withCredentials: true
  }

  getComments() {
    return this.http.get<Comment[]>(api_url + user_url.FETCH_COMMENTS,
      this.withCredentials)
  }

  fetchNestedComments(id: string) {
    return this.http.get<Comment[]>(api_url + user_url.FETCH_COMMENTS + `?parentId=${id}`, this.withCredentials)
  }

  createComment(comment: CreateCommentDto) {
    return this.http.post<Comment>(api_url + user_url.CREATE_COMMENT,
      comment,
      this.withCredentials,
    )
  }

  deleteComment(id: number) {
    return this.http.delete(api_url + user_url.DELETE_COMMENT + id,
      this.withCredentials,
    )
  }

}


