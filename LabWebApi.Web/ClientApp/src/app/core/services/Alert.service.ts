import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
providedIn: 'root'
})
export class AlertService {
successAlert(message: string, title: string){

Swal.fire({
position: 'top-end',
icon: 'success',
title: title,
text: message,
showConfirmButton: false,
timer: 1500
})
}
errorAlert(errorMessage: string, title: string){
Swal.fire({
icon: 'error',
title: title,
text: errorMessage,
})
}
okCancalAlert(title: string): Promise<boolean>{
return new Promise<boolean>((resolve) => {
Swal.fire({
title: 'Are you sure?',
text: title,
icon: 'warning',
showCancelButton: true,
confirmButtonColor: '#3085d6',
cancelButtonColor: '#d33',
confirmButtonText: 'Yes, delete it!'
}).then((result) => {
if (result.isConfirmed) {
resolve(true);
} else {
resolve(false);
}
});
});
}
}