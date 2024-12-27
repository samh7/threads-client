import { Component, effect, inject, input, signal } from '@angular/core';
import { LucideAngularModule, Heart, ChevronDown } from 'lucide-angular';
import { CommentFormComponent } from "../comment-form/comment-form.component";
import { Comment } from '../../interfaces/comment.interface';
import { StateService } from '../../services/state.service';
import { User } from '../../interfaces/user.interface';
import { CommentsService } from '../../services/comments.service';
import { single } from 'rxjs';

@Component({
  selector: 'app-comment',
  imports: [
    LucideAngularModule,
    CommentFormComponent
  ],
  templateUrl: './comment.component.html',
  styles: ``
})
export class CommentComponent {
  readonly heartIcon = Heart
  readonly ChevronDown = ChevronDown
  isExpanded = signal(false)
  isReplying = signal(false)
  comment = input<Comment>()
  nestedComments = signal<Comment[]>([])
  stateService = inject(StateService)
  commentService = inject(CommentsService)
  user = signal<User | null>(null)
  isRootComment = signal<boolean>(false)



  nestedCommentsEffect = effect(() => {
    if (this.isExpanded()) {
      this.commentService.fetchNestedComments(this.comment()?.id as string)
        .subscribe((comments) => {
          this.nestedComments.set(comments)
        })
    }
  })

  toggleReplying() {
    this.isReplying.set(!this.isReplying())
    if (this.isReplying()) {
      this.isExpanded.set(true)
    }
  }

  toggleExpanded() {
    this.isExpanded.set(!this.isExpanded())
  }



  createComment(commentText: { text: string }) {
    this.stateService.user$.subscribe((user) => {
      this.user.set(user)
    })
    if (!this.user) {
      alert("Not Logged in!")
      return
    }
    if (commentText.text.length < 1) {
      alert("Comment can't be empty!")
      return;
    }
    this.commentService.createComment({
      text: commentText.text,
      userId: this.user()!.id,
      parentId: this.comment()?.id
    }).subscribe(
      (createdComment) => {
        this.nestedComments.set([createdComment, ...this.nestedComments()])
      })
  }

  checkCommentsLevels(){
    
  }
}
