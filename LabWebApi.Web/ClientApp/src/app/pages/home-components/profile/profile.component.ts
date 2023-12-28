import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InputValidationService } from
  'src/app/core/services/InputValidation.service';
  import { Subject } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserProfileService } from 'src/app/core/services/UserProfile.service';
import { environment } from 'src/environments/environment';
import { UserInfo } from 'src/app/core/models/admin/UserInfo';
import { AlertService } from 'src/app/core/services/Alert.service';
import { UserProfile } from 'src/app/core/models/user/UserProfile';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { Router } from '@angular/router';
import { EventEmitterService } from 'src/app/core/services/EventEmitter.service';
import { ChangePasswordInfo } from 'src/app/core/models/user/ChangePasswordInfo';
import { AuthenticationService } from
    'src/app/core/services/Authentication.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit , OnDestroy{
  formGroup: FormGroup;
  passwordFormGroup: FormGroup;
  user: UserInfo;
  image: SafeUrl | null = null;
  defaultImage: string = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp';
  display: FormControl = new FormControl("", Validators.required);
  private unsubscribe$ = new Subject<void>();
  private file: File;

  constructor(
    private userProfileService: UserProfileService,
    private sanitizer: DomSanitizer,
    private alertService: AlertService,
    public validationService: InputValidationService,
    private eventEmitterService: EventEmitterService,
    private router: Router,
    private formBuilder: RxFormBuilder,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.userProfileService.getUserImage().subscribe((data: Blob) => {
      const blob = new Blob([data], { type: data.type });
      const unsafeImg = URL.createObjectURL(blob);
      this.image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
    });

    this.userProfileService.getUserInfo().subscribe((data: UserInfo) => {
      this.user = data;
    });

    this.formGroup = this.formBuilder.formGroup(new UserProfile());
    this.passwordFormGroup = this.formBuilder.formGroup(new ChangePasswordInfo());
  }
  public ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
}
  getImageTypes(): string {
    let types: string = '';
    environment.imageSettings.imageTypes.forEach(function (x) {
      types += '.' + x + ',';
    });
    return types;
  }

  uploadImage(event: any) {
    let file: File = event.target.files[0];

    if (file.size > environment.imageSettings.maxSize * 1024 * 1024) {
      this.alertService.errorAlert('Max size is ' + environment.imageSettings.maxSize + ' Mb', 'Error');
      return;
    }
    
    this.file = file;
    const unsafeImg = URL.createObjectURL(this.file);
    this.image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
  }

  saveImage(event: any) {

    this.userProfileService.updateUserImage(this.file).subscribe(() => {
      const unsafeImg = URL.createObjectURL(this.file);
      this.image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      this.alertService.successAlert("Successful","save image");
    });
  }

  getControl(controlName: string): any {
    console.log(this.formGroup.get(controlName))
    return this.formGroup.get(controlName);
  }

  getPasswordControl(controlName: string): any {
    return this.passwordFormGroup.get(controlName);
  }

  async editProfile() {
    this.userProfileService.editProfile(this.formGroup.value).subscribe(
      () => {
        this.alertService.successAlert("Successful", "Updated!");
        this.router.navigate(['profile']);
        this.eventEmitterService.onComponentInvoke();
      }
    );
  }
  async changePassword(){
    this.userProfileService.changePassword(this.passwordFormGroup.value).subscribe(
      () => {
        this.alertService.successAlert("Successful", "Updated!");
        this.router.navigate(['profile']);
        this.eventEmitterService.onComponentInvoke();
      }
    );
  }
  async deleteProfile(){
    const confirmed = await this.alertService.okCancalAlert(`Do you really want 
    to delete profile?`);
    if (confirmed) {
      this.userProfileService.deleteProfile().subscribe(
        () => {
          this.authService.logout().subscribe(() => {
            this.router.navigate(['login']);
            this.alertService.successAlert("Successful", "Updated!");
            this.eventEmitterService.onComponentInvoke();
          })
        }
      );
    }
  }
}
