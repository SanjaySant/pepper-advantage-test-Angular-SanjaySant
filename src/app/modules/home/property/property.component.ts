import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent {
  subscription: Subscription | undefined;
  title: any;
  selectedStars: number = 0;
  propertyForm!: FormGroup;
  fileToUpload!: File;
  getImage: any = '';
  isShow_SelectedImage: boolean = false;
  Image_ForDisplay: any;

  constructor(
    private router: Router, private activateRoute: ActivatedRoute, private toastr: ToastrService,
    private authService: AuthService, private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((data: any) => {
      console.log('action:', data);
      this.title = data['action'];

      this.createForm(); // create reactive form

      // get Property Data
      this.subscription = this.authService.getPackageData().subscribe(data => {
        console.log('property data:', data);
        if (data != null && this.title == 'edit') {
          this.propertyForm.patchValue({
            amount: data.amount,
            category: data.category,
            Feedback: data.reviews,
            status: data.status,
            image: data.image
          });
          this.selectedStars = data.reviews;
          this.getImage = data.image
        }
      });
    });
  }

  createForm() {
    this.propertyForm = this.fb.group({
      amount: ['', [Validators.required]],
      category: ['', [Validators.required]],
      Feedback: ['', [Validators.required]],
      status: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  // get form controls
  get amount() { return this.propertyForm.get('amount'); }
  get category() { return this.propertyForm.get('category'); }
  get Feedback() { return this.propertyForm.get('Feedback'); }
  get status() { return this.propertyForm.get('status'); }
  get image() { return this.propertyForm.get('image'); }

  toggleStar(star: number): void {
    console.log(star);

    // Toggle the selectedStars value
    this.selectedStars = star === this.selectedStars ? star - 1 : star;

    this.propertyForm.patchValue({
      Feedback: this.selectedStars
    });
  }

  // set image
  handleFileInput(e: any) {
    console.log('image data:', e.target.files);
    this.fileToUpload = e.target.files.item(0)
    this.propertyForm.patchValue({
      image: this.fileToUpload
    })
    this.isShow_SelectedImage = true;
    // For show image
    var reader = new FileReader()
    reader.onload = (event: any) => {
      this.Image_ForDisplay = reader.result
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  onSubmit() {
    console.log(this.propertyForm.value);

    if (this.propertyForm.invalid) {
      console.log('Form is invalid.');
      this.toastr.error('All fields are mandatory..!', "", {
        timeOut: 2000,
      });
      // Return if the form is invalid
      const controls = this.propertyForm.controls;
      if (this.propertyForm.invalid) {
        Object.keys(controls).forEach(controlName => {
          controls[controlName].markAsTouched()
        });
        return;
      }
    } else {
      console.log('Form submitted:', this.propertyForm.value);
      this.toastr.success(`Property ${this.title}  Successfully ..!`, "", {
        timeOut: 2000,
      });
    }
  }

  ngOnDestroy() {
    // unsubscribe subscription
    if (!!this.subscription) this.subscription.unsubscribe()
  }

}
