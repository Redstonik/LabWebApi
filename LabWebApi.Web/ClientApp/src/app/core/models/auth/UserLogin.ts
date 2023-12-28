import { email, password, required } from "@rxweb/reactive-form-validators";
export class UserLogin {
@required()
@email()
email: any;
@required()
@password({validation:{minLength: 5, digit: true, specialCharacter: true}})
password: any;
}