import { Component, OnInit, inject } from '@angular/core';
import { SideBarItem } from './side-bar-item/side-bar-item';
import { UserType } from '../../models/enum';
import { UserDto } from '../../models/UserDto';
import { UserService } from '../../../shared/services/userService';
import { Route } from '@angular/router';
import { CommonMethods } from '../../services/common.methods';

@Component({
  selector: 'app-side-bar',
  imports: [SideBarItem],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar implements OnInit {

common =new CommonMethods();

  userService = inject(UserService);

  userdata: UserDto = this.common.getfromLS('user');

  routes: any[] = [];

  ngOnInit(): void {

    // console.log(
    //   'userdata ' + JSON.stringify(this.userService.getuserFLS())
    // );

    if (this.userdata.type === UserType.User) {

      this.routes = [
        {
          title: 'Dashboard',
          route: '/home/notes',
          icon: 'fa-solid fa-house text-blue-500',
          description: 'Dashboard for User',
          allowedUserType: 1
        },
        {
          title: 'All Notes',
          route: '/home/notes/notelist',
          icon: 'fa-solid fa-note-sticky text-indigo-500',
          description: 'All Notes for User',
          allowedUserType: 1
        },
        {
          title: 'Favorites',
          route: '/home/notes/favorites',
          icon: 'fa-solid fa-star text-yellow-500',
          description: 'Favorite notes for User',
          allowedUserType: 1
        },
        {
          title: 'Recent Notes',
          route: '/home/notes/recent',
          icon: 'fa-solid fa-clock-rotate-left text-purple-500',
          description: 'Recent notes for User',
          allowedUserType: 1
        },
        {
          title: 'Completed Notes',
          route: '/home/notes/completed',
          icon: 'fa-solid fa-circle-check text-green-500',
          description: 'Completed notes for User',
          allowedUserType: 1
        },
        {
          title: 'Archived',
          route: '/home/notes/archived',
          icon: 'fa-solid fa-box-archive text-orange-500',
          description: 'Archived notes for User',
          allowedUserType: 1
        },
        {
          title: 'Trash',
          route: '/home/notes/trash',
          icon: 'fa-solid fa-trash text-red-500',
          description: 'Deleted notes for User',
          allowedUserType: 1
        }
      ];
    }
    else if (this.userdata.type === UserType.Admin) {

      this.routes = [
        {
          title: 'All Users',
          route: '/admin/users',
          icon: 'fa-solid fa-user-group text-blue-500',
          allowedUserType: 0
        },
        {
          title: 'Add User',
          route: '/admin/users/add',
          icon: 'fa-solid fa-user-plus text-green-500',
          allowedUserType: 0
        },
        {
          title: 'User Roles',
          route: '/admin/users/roles',
          icon: 'fa-solid fa-user-shield text-purple-500',
          allowedUserType: 0
        },

        {
          title: 'All Notes',
          route: '/admin/notes',
          icon: 'fa-solid fa-note-sticky text-yellow-500',
          allowedUserType: 0
        },
        {
          title: 'Archived Notes',
          route: '/admin/notes/archived',
          icon: 'fa-solid fa-box-archive text-orange-500',
          allowedUserType: 0
        },
        {
          title: 'Reported Notes',
          route: '/admin/notes/reported',
          icon: 'fa-solid fa-flag text-red-500',
          allowedUserType: 0
        },

        {
          title: 'Daily Statistics',
          route: '/admin/analytics/daily',
          icon: 'fa-solid fa-calendar-day text-cyan-500',
          allowedUserType: 0
        },
        {
          title: 'Monthly Reports',
          route: '/admin/analytics/monthly',
          icon: 'fa-solid fa-chart-column text-indigo-500',
          allowedUserType: 0
        },
        {
          title: 'User Activity',
          route: '/admin/analytics/activity',
          icon: 'fa-solid fa-chart-simple text-pink-500',
          allowedUserType: 0
        },

        {
          title: 'System Settings',
          route: '/admin/settings/system',
          icon: 'fa-solid fa-sliders text-slate-500',
          allowedUserType: 0
        },
        {
          title: 'Backup',
          route: '/admin/settings/backup',
          icon: 'fa-solid fa-database text-emerald-500',
          allowedUserType: 0
        },
        {
          title: 'Security',
          route: '/admin/settings/security',
          icon: 'fa-solid fa-shield-halved text-rose-500',
          allowedUserType: 0
        }
      ];
    }
  }
}
