import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/userService';
import { UserType } from '../../shared/models/UserType.enum';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  userService = inject(UserService)
  isAdmin = false;
  userdata = this.userService.user()

  ngOnInit(): void {
    // console.log('this is from dashboard :' + this.userdata.type, UserType.Admin)
    if (this.userdata.type === UserType.Admin) {
      this.isAdmin = true;
    }

  }


}
