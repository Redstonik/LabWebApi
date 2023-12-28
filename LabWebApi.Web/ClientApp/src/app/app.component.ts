import { Component } from '@angular/core';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    ngOnInit() {
        ReactiveFormConfig.set({
            validationMessage: {
                required: 'This field is required',
                minNumber: 'Minimum number for this field {{1}}',
                maxNumber: 'Maximum number for this field {{1}}',
                email: 'Incorrect mail',
                minLength: 'Minimum length of {{1}} characters',
                maxLength: 'Maximum length of {{1}} characters',
                compare: 'The data does not match',
                password: 'Minimum of 5 characters, a number and a special character',
                alpha: 'The field must not contain numbers'
            }
        });
    }
}