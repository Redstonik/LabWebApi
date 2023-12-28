import {required} from "@rxweb/reactive-form-validators";
import { UserInfo } from '../admin/UserInfo';

export class ProductInfo {
    @required()
    id: any;

    @required()
    name: string;

    @required()
    description: string;


    publicationDate: Date;

    @required()
    price: Number;

    userWhoCreated: UserInfo;
}
