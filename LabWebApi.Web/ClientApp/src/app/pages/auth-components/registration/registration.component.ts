import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { UserRegistration } from 'src/app/core/models/auth/UserRegistration';
import { AlertService } from 'src/app/core/services/Alert.service';
import { AuthenticationService } from 'src/app/core/services/Authentication.service';
import { EventEmitterService } from 'src/app/core/services/EventEmitter.service';
import { InputValidationService } from 'src/app/core/services/InputValidation.service';



import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { AuthorizationRoles } from 'src/app/configs/auth-roles';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],

})
export class RegistrationComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private formBuilder: RxFormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private eventEmitterService: EventEmitterService,
    private alertService: AlertService,
    public validationService: InputValidationService) { }

  ngOnInit() {
    let userRegistration = new UserRegistration();
    this.formGroup = this.formBuilder.formGroup(userRegistration);
  }
  async registration() {
    this.authenticationService.registration(this.formGroup.value).subscribe(
      () => {
        this.alertService.successAlert("Successful", "Registered!");
        this.router.navigate(['login']);
        this.eventEmitterService.onComponentInvoke();
      }
    );
  }
  get userRoles(): typeof AuthorizationRoles {
    return AuthorizationRoles;
  }

  getControl(controlName: string): any {
    return this.formGroup.get(controlName);
  }
}
