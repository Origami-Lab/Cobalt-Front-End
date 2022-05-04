import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from 'src/app/auth/auth.service';
import {markFormControlAsTouched} from 'src/app/shared/utils/mark-form-control-as-touched';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'co-experiment-details-chemistry',
  templateUrl: './experiment-details-chemistry.component.html',
  styleUrls: ['./experiment-details-chemistry.component.scss']
})
export class ExperimentDetailsChemistryComponent implements OnInit {
  loading = false;
  chemistryForm: FormGroup = new FormGroup({});
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private http: HttpClient) {
    this.chemistryForm = this.fb.group({
      equation: ['', Validators.required],
      compound: [''],
      unit: [''],
      value: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(event: Event): void {
    event.preventDefault();
    markFormControlAsTouched(this.chemistryForm);
    if (!this.chemistryForm.valid) {
      return;
    }
    // this.loading = true;
    const options = {
      withCredentials: false,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        responseType: 'text'
      }
    };
    let formBody = [];
    for (let property in this.chemistryForm.value) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(this.chemistryForm.value[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    const params = formBody.join('&');
    this.http.post(environment.chemistryURL, params, options).subscribe(
      (rs: any) => {
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', rs.text);
      },
      error => {
        console.log('error 123:', error);
      }
    );

    // this.authService.signUp(params).subscribe(
    //   () => {
    //     this.toastr.success('Registration successfully');

    //     this.loading = false;
    //   },
    //   error => {
    //     this.errorMessage = error.error.errors.message;

    //     this.chemistryForm.setErrors({wrongLoginCredentials: true});

    //     this.loading = false;
    //   }
    // );
  }
}
