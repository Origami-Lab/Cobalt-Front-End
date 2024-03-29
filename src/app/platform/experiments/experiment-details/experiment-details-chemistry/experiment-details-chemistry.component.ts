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
  chemistryData = '';

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
    this.loading = true;
    const options = {
      withCredentials: false,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      responseType: 'text' as 'text'
    };
    const formBody = [];

    for (const property of Object.keys(this.chemistryForm.value)) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(this.chemistryForm.value[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    const params = formBody.join('&');
    this.http.post(environment.chemistryURL, params, options).subscribe(
      (rs: any) => {
        this.chemistryData = rs;
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    );
  }
}
