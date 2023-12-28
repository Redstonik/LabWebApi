import {required, minLength, maxLength, minNumber, maxNumber} from "@rxweb/reactive-form-validators";

export class CreatedProductInfo {
    @required()
    @minLength({ value: 1 })
    @maxLength({ value: 255 })
    name: string;

    @required()
    @minLength({ value: 1 })
    @maxLength({ value: 511 })
    description: string;


    publicationDate: string;

    @required()
    @minNumber({ value: 0, message: 'Мінімальна ціна повинна бути більше 0' })
    @maxNumber({ value: 100000, message: 'Максимальна ціна повинна бути менше 100000' })
    price: Number;
}
