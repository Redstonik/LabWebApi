import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "../services/Authentication.service";

@Injectable({
providedIn: 'root'
})
export class AutoLoginGuard implements CanActivate{
constructor(private authenticationService: AuthenticationService,
private router: Router){ }
async canActivate(): Promise<boolean> {
if(!await this.authenticationService.isAuthenticatedWithRefreshToken())
{
return true;
}
this.router.navigate(['user-home']);
return false;
}
}