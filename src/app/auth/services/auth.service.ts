import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers: HttpHeaders;

  public _propertyData$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient, private router: Router,
  ) {
    this.headers = new HttpHeaders();
  }

  getPackageData() {
    return this._propertyData$.asObservable()
  }
  setPackageData(data: any) {
    this._propertyData$.next(data)
    console.log('_propertyData:', data);
  }

  private items = [
    { id: 1, posted_date: '01.09.2023', image: '../../../../assets/images/Rectangle 1.png', amount: 890000, category: 'House', reviews: '3', status: 'Available' },
    { id: 2, posted_date: '01.09.2023', image: '../../../../assets/images/Rectangle 2.png', amount: 150000, category: 'Flat', reviews: '3', status: 'Sold' },
    { id: 3, posted_date: '01.09.2023', image: '../../../../assets/images/Rectangle 3.png', amount: 1200000, category: 'House', reviews: '5', status: 'Under Offer' },
    { id: 4, posted_date: '01.09.2023', image: '../../../../assets/images/Rectangle 4.png', amount: 900000, category: 'House', reviews: '3', status: 'Under Offer' },
    { id: 5, posted_date: '01.09.2023', image: '../../../../assets/images/Rectangle 5.png', amount: 890000, category: 'Flat', reviews: '1', status: 'Available' },
    { id: 6, posted_date: '01.09.2023', image: '../../../../assets/images/Rectangle 6.png', amount: 399000, category: 'Flat', reviews: '5', status: 'Sold' }
  ];

  getItems() {
    return this.items;
  }

}
