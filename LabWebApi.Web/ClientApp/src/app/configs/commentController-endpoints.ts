import { environment } from 'src/environments/environment';

export const baseUrl = environment.apiUrl;
export const productControllerUrl = '/comments';

export const commentsUrl = baseUrl + productControllerUrl;