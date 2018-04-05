import {User} from  './user';
import {Session} from  './session';

export const SESSION : Session = localStorage.length!=0?JSON.parse(localStorage['Session']):{user:{UId:0,
    nombre: '',
    rol: '',
    }}