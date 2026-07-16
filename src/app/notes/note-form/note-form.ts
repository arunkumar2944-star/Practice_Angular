import { Component, inject, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from "@angular/router";
import { CommonMethods } from '../../../shared/services/common.methods';
import { UserDto } from '../../../shared/models/UserDto';
import { NoteService } from '../../../shared/services/note-service';
import { NoteDto } from '../../../shared/models/Note.dto';
import { Category, Priority, Status, Visibility } from '../../../shared/models/enum';
@Component({
  selector: 'app-note-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './note-form.html',
  styleUrl: './note-form.css',
})
export class NoteForm implements OnInit {


  @ViewChild('noteTitle')
  noteTitle!: ElementRef<HTMLInputElement>;
  fb = inject(FormBuilder)
  noteService = inject(NoteService)

  router = inject(Router)
  selectedFiles: File[] = [];
  common = new CommonMethods()
  user: any = {};

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

    attachments: this.fb.control<File[]>([], Validators.required),

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
      this.noteTitle.nativeElement.focus();
    });
  }
  saveNote() {
    this.user = this.common.getfromLS('user')


    const note: NoteDto = {
      title: this.noteForm.controls.title.value ?? '',
      details:this.noteForm.controls.details.value ?? '',
      tag: this.noteForm.controls.Tag.value ?? '',
      attachments: this.noteForm.controls.attachments.value??[],
      category: (this.noteForm.controls.category.value??Category.Personal)as Category,
      priority: (this.noteForm.controls.priority.value??Priority.Medium)as Priority,
      status: (this.noteForm.controls.status.value??Status.Active)as Status,
      date: this.noteForm.controls.date.value  ? new Date(this.noteForm.controls.date.value): new Date(),
      dueDate: this.noteForm.controls.dueDate.value?new Date(this.noteForm.controls.dueDate.value):new Date(),
      reminderDate: this.noteForm.controls.reminderDate.value?new Date(this.noteForm.controls.reminderDate.value):new Date(),
      visibility: (this.noteForm.controls.visibility.value ??Visibility.Private) as Visibility,
      isFavorite: this.noteForm.controls.isFavorite.value??false,
      isPined: this.noteForm.controls.isPined.value??false,
      isReminded: this.noteForm.controls.isReminded.value??false,
      user:this.user??''
    }

    this.noteService.createNote(note,this.selectedFiles).subscribe({
      next: (response) => {

        if(response.status){
          alert(response.message)
          this.reset()
        }

      },
      error: (error) => {
        console.error('Registration failed', error);
        alert('Registration Failed');
      }});
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
    queueMicrotask(() => {
      this.noteTitle.nativeElement.focus();
    });

  }
}
