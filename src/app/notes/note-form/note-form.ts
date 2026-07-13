import { Component ,inject} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink ,Router} from "@angular/router";

@Component({
  selector: 'app-note-form',
  imports: [ReactiveFormsModule ,RouterLink],
  templateUrl: './note-form.html',
  styleUrl: './note-form.css',
})
export class NoteForm {
fb = inject(FormBuilder)

router=inject(Router)


  noteForm = this.fb.group({

  title: [''],
  details: [''],

  category: ['Personal'],
  priority: ['Medium'],
  status: ['Draft'],

  Tag: [''],

  attachmentUrl: [''],

  visibility: ['Private'],

  date: [new Date()],
  dueDate: [''],
  reminderDate: [''],

  isFavorite: [false],
  isPined: [false],
  isReminded: [false],
  isActive: [true]

});
}
