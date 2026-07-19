import { Component, inject, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from "@angular/router";
import { CommonMethods } from '../../../shared/services/common.methods';
import { UserDto } from '../../../shared/models/UserDto';
import { NoteService } from '../../../shared/services/note-service';
import { NoteDto } from '../../../shared/models/Note.dto';
import { Category, Priority, Status, Visibility } from '../../../shared/models/enum';
import { NgClass } from "@angular/common";
@Component({
  selector: 'app-note-form',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './note-form.html',
  styleUrl: './note-form.css',
})
export class NoteForm implements OnInit {

   categoryIcons: Record<Category, string> = {
  [Category.Personal]: 'fa-solid fa-user text-blue-500',
  [Category.Work]: 'fa-solid fa-briefcase text-orange-500',
  [Category.Study]: 'fa-solid fa-book text-green-500',
  [Category.Meeting]: 'fa-solid fa-users text-purple-500'
};

 priorityIcons: Record<Priority, string> = {
  [Priority.Low]: 'fa-solid fa-arrow-down text-green-500',
  [Priority.Medium]: 'fa-solid fa-minus text-yellow-500',
  [Priority.High]: 'fa-solid fa-triangle-exclamation text-red-500'
};

 statusIcons: Record<Status, string> = {
  [Status.Draft]: 'fa-solid fa-pen text-gray-500',
  [Status.Active]: 'fa-solid fa-bolt text-green-500',
  [Status.Completed]: 'fa-solid fa-circle-check text-red-500',
  [Status.Archived]: 'fa-solid fa-box-archive text-pink-500'
};

 visibilityIcons: Record<Visibility, string> = {
  [Visibility.Private]: 'fa-solid fa-lock text-indigo-500',
  [Visibility.Team]: 'fa-solid fa-users text-cyan-500',
  [Visibility.Public]: 'fa-solid fa-globe text-sky-500'
};

  @ViewChild('noteTitle')
  noteTitle!: ElementRef<HTMLInputElement>;
  fb = inject(FormBuilder)
  noteService = inject(NoteService)

  router = inject(Router)
  selectedFiles: File[] = [];
  common = new CommonMethods()
  user: any = {};

  // priorities = Object.values(Priority);
  // categories = Object.values(Category);
  // statuses = Object.values(Status);


  noteForm = this.fb.group({
    user: [null],
    title: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]
    ],

    details: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000)
      ]
    ],

    category: [
      '',
      Validators.required
    ],

    priority: [
      '',
      Validators.required
    ],

    status: [
      '',
      Validators.required
    ],

    Tag: [
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ],

    attachments: this.fb.control<File[]>([]),

    visibility: ['', Validators.required],

    date: [
      new Date(),
      Validators.required
    ],

    dueDate: [
      '',
      Validators.required
    ],

    reminderDate: [''],

    isFavorite: [false],
    isPined: [false],
    isReminded: [false],
    isActive: [false]

  });



  categories = Object.values(Category);

  priorities = Object.values(Priority);

  statuses = Object.values(Status);

  visibilities = Object.values(Visibility);

  get title() {
    return this.noteForm.get('title');
  }

  get details() {
    return this.noteForm.get('details');
  }

  get tag() {
    return this.noteForm.get('Tag');
  }

  get dueDate() {
    return this.noteForm.get('dueDate');
  }

  get attachments() {
    return this.noteForm.get('attachments');
  }


  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files) {

      const newFiles: File[] = Array.from(input.files);

      this.selectedFiles.push(...newFiles);

      this.noteForm.patchValue({
        attachments: this.selectedFiles
      });

      // console.log(this.selectedFiles);

      input.value = '';
    }
  }


  removeFile(index: number) {

    this.selectedFiles.splice(index, 1);

    this.noteForm.patchValue({
      attachments: this.selectedFiles
    });
  }

  get category() {
    return this.noteForm.get('category');
  }

  get priority() {
    return this.noteForm.get('priority');
  }

  get status() {
    return this.noteForm.get('status');
  }
  get visibility() {
    return this.noteForm.get('visibility');
  }

  ngOnInit(): void {
    queueMicrotask(() => {
      this.noteTitle?.nativeElement?.focus();
    });
  }
  saveNote() {
    this.user = this.common.getfromLS('user')


    const note: NoteDto = {
      title: this.noteForm.controls.title.value ?? '',
      details: this.noteForm.controls.details.value ?? '',
      tag: this.noteForm.controls.Tag.value ?? '',
      attachments: this.noteForm.controls.attachments.value ?? [],
      category: (this.noteForm.controls.category.value ?? Category.Personal) as Category,
      priority: (this.noteForm.controls.priority.value ?? Priority.Medium) as Priority,
      status: (this.noteForm.controls.status.value ?? Status.Active) as Status,
      date: this.noteForm.controls.date.value ? new Date(this.noteForm.controls.date.value) : new Date(),
      dueDate: this.noteForm.controls.dueDate.value ? new Date(this.noteForm.controls.dueDate.value) : new Date(),
      reminderDate: this.noteForm.controls.reminderDate.value ? new Date(this.noteForm.controls.reminderDate.value) : new Date(),
      visibility: (this.noteForm.controls.visibility.value ?? Visibility.Private) as Visibility,
      isFavorite: this.noteForm.controls.isFavorite.value ?? false,
      isPined: this.noteForm.controls.isPined.value ?? false,
      isReminded: this.noteForm.controls.isReminded.value ?? false,
      user: this.user ?? ''
    }

    this.noteService.createNote(note, this.selectedFiles).subscribe({
      next: (response) => {

        if (response.status === 'Success') {
          alert(response.message)
          this.reset()
        }

      },
      error: (error) => {
        console.error('Registration failed', error);
        alert('Registration Failed');
      }
    });
    // console.log(this.noteForm.value)

    //this.reset()
  }

  reset() {

    this.noteForm.reset({
      title: '',
      details: '',
      category: '',
      priority: '',
      status: '',
      Tag: '',
      attachments: [] as File[],
      visibility: '',
      // date: '',
      dueDate: '',
      reminderDate: '',
      isFavorite: false,
      isPined: false,
      isReminded: false,
      isActive: true
    });
    this.selectedFiles = [];
    queueMicrotask(() => {
      this.noteTitle.nativeElement.focus();
    });

  }
}
