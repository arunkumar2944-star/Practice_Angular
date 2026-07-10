import { Component, OnInit, HostListener } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { SideBar } from '../../shared/components/side-bar/side-bar';
import { UserDto } from '../../shared/models/UserDto';
import { UserType } from '../../shared/models/UserType.enum';
@Component({
  selector: 'app-home',
  imports: [RouterOutlet, SideBar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  user: any = null;
  isAdmin = false;
  showMenu = false;
  constructor(private router: Router) { }
  ngOnInit(): void {
    const data = localStorage.getItem('user');

    if (data) {
      this.user = JSON.parse(data);
      if (this.user.type === UserType.Admin)
        this.isAdmin = true;
    }
  }
  goToProfile() {
    this.router.navigate(['home/profile']);
  }

  updatePwd(){
    this.router.navigate(['/home/updatepassword']);

  }
  logout() {

    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('.profile-menu')) {
      this.showMenu = false;
    }
  }
}
