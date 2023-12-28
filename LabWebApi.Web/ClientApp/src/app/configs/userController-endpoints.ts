import { environment } from 'src/environments/environment';
export const baseUrl = environment.apiUrl;
export const userContollerUrl = '/User';
export const userProfileUrl = baseUrl + userContollerUrl + '/profile';
export const uploadUserAvatarUrl = baseUrl + userContollerUrl + '/avatar';
export const updateProfileInfoUrl = baseUrl + userContollerUrl + '/update';
export const changePasswordInfoUrl = baseUrl + userContollerUrl + '/changePassword';
export const deleteProfileUrl = baseUrl + userContollerUrl + '/delete';
