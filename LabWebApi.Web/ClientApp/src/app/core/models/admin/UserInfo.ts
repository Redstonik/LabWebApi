import { alpha, email, minLength, required } from "@rxweb/reactive-form-validators";
import { AuthorizationRoles } from "src/app/configs/auth-roles";

export class UserInfo {
    @required()
    id: any;

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
    birthday: Date;

    @required()
    role: AuthorizationRoles;
}
