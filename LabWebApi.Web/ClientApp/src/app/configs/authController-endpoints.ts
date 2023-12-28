import { environment } from 'src/environments/environment';
export const baseUrl = environment.apiUrl;
export const authControllerUrl = '/Authentication'
export const accountLoginUrl = baseUrl + authControllerUrl + '/login';
export const accountRegistrationUrl = baseUrl + authControllerUrl +
'/registration';
export const accountLogoutUrl = baseUrl + authControllerUrl + '/logout';
export const refreshTokenUrl = baseUrl + authControllerUrl + '/refresh-token';