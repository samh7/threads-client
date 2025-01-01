import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommentComponent } from "../../components/comment/comment.component";
import { Comment } from '../../interfaces/comment.interface';
import { CommentsService } from '../../services/comments.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { StateService } from '../../services/state.service';
import { User } from '../../interfaces/user.interface';
import { CommentFormComponent } from "../../components/comment-form/comment-form.component";

@Component({
  selector: 'app-home',
  imports: [CommentComponent, CommentFormComponent],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit {
  router = inject(Router)
  comments = signal<Comment[]>([])
  commentService = inject(CommentsService)
  authService = inject(AuthService)
  stateService = inject(StateService)
  userService = inject(UserService)
  user = signal<User | null>(null)


  ngOnInit() {

    this.stateService.user$.subscribe((user) => {
      this.user.set(user)
    })
    this.authService.status().subscribe((resp) => {
      if (resp.email !== this.user()?.email) {

        alert("Not authenticated!")
        this.userService.deleteUserFromStorage()
        this.stateService.clearUser()
        this.router.navigate(["/login"])
      }
    },
      (_error) => {
        alert("Not authenticated!")
        this.userService.deleteUserFromStorage()
        this.stateService.clearUser()
        this.router.navigate(["/login"])
      })

    this.getComments()
  }



  getComments() {
    this.commentService.getComments().subscribe((comments) => {
      this.comments.set(comments)
    },)
  }

  createComment(commentText: { text: string }) {
    if (!this.user()) {
      alert("Not Logged in!")
      return;
    }
    if (commentText.text.length < 1) {
      alert("Comment can't be empty!")
      return;
    }

    this.commentService.createComment({
      text: commentText.text,
      userId: this.user()!.id,
      parentId: this.user()?.id

    }).subscribe((createdComment) => {

      this.comments.set([createdComment, ...this.comments()])
    })
  }


}

