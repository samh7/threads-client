import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  imports: [],
  templateUrl: './comment-form.component.html',
  styles: ``
})
export class CommentFormComponent {
  buttonText = input("Create")
  placeholer = input("Write Something...")
  formSubmitted = output<{

    text: string
  }>()

  formSubmit(event: SubmitEvent) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const commentInputElement = form.elements.namedItem("comment-text") as HTMLInputElement
    const commentText = commentInputElement.value
    form.reset()
    this.formSubmitted.emit({
      text: commentText
    })
  }
}
