import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  items: any;

  constructor(
    private router: Router, private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.items = this.authService.getItems();
    console.log('items:', this.items);
  }

  onProperty(item: any) {
    console.log('item:', item);
    if (item == 'new') {
      this.router.navigate(['/home/property', 'new']);
    } else {
      this.authService.setPackageData(item);
      this.router.navigate(['/home/property', 'edit']);
    }
  }
}
