import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user_name: any = '';
  user_id: any = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user_id = sessionStorage.getItem('user_id');
    this.user_name = sessionStorage.getItem('user_name');
  }

  onLogout() {
    this.toastr.info('Logout Successfull..!', "", {
      timeOut: 2000,
    });
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }

}
