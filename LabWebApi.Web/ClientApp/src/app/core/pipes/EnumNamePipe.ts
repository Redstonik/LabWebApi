import { Pipe, PipeTransform } from '@angular/core';
import { AuthorizationRoles } from 'src/app/configs/auth-roles';
@Pipe({
    name: 'enumName'
})
export class EnumNamePipe implements PipeTransform {
    transform(value: number): string {
        return AuthorizationRoles[value];
    }   
}