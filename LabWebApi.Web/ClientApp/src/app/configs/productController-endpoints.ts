import { environment } from 'src/environments/environment';

export const baseUrl = environment.apiUrl;
export const productControllerUrl = '/Product';

export const productsUrl = baseUrl + productControllerUrl ;

