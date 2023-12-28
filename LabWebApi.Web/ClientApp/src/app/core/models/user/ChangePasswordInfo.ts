import { alpha, compare, email, maxDate, minLength, password, required } from
"@rxweb/reactive-form-validators";
export class ChangePasswordInfo {
    @password({validation:{minLength: 5, digit: true, specialCharacter: true}})
    currentPassword: any;
    @required()
    @password({validation:{minLength: 5, digit: true, specialCharacter: true}})
    newPassword: any;
    @required()
    @password({validation:{minLength: 5, digit: true, specialCharacter: true}})
    @compare({fieldName:'newPassword'})
    confirmPassword: any;
}