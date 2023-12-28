import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class InputValidationService {
    getErrorMessage(value: any): any {
        let errors = value.errors;
        return errors?.[Object.getOwnPropertyNames(errors)[0]].message;
    }
}