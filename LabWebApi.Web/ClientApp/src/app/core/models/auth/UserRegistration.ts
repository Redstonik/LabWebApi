import { alpha, compare, email, maxDate, minLength, password, required } from
"@rxweb/reactive-form-validators";
import { AuthorizationRoles } from "src/app/configs/auth-roles";
export class UserRegistration {
@required()
@minLength({value: 5})
@alpha()
name: string;
@required()
@minLength({value: 5})
@alpha()
surname: string;
@required()
@minLength({value: 8})
userName: string;
@required()
@email()
email: string;
@required()
birthDay: Date;

@required()
role: AuthorizationRoles;
@required()
@password({validation:{minLength: 5, digit: true, specialCharacter: true}})
password: any;
@required()
@password({validation:{minLength: 5, digit: true, specialCharacter: true}})
@compare({fieldName:'password'})
confirmPassword: any;
}