import { environment } from 'src/environments/environment';

export const baseUrl = environment.apiUrl;
export const adminControllerUrl = '/Admin';

export const usersUrl = baseUrl + adminControllerUrl + '/users';