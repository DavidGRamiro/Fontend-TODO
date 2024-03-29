import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  private _avatarFolder = 'assets/images'
  // Recurso generados de avatares
  // https://getavataaars.com/

  constructor() {}

  // Carga de todos los avatares que tenemos guardados
  getTodosAvatares(){
    return [
      { name: 'Pepe',img:`${this._avatarFolder}/avataaars1.png`},
      { name: 'David',img:`${this._avatarFolder}/avataaars2.png`},
      { name: 'Kaiser',img:`${this._avatarFolder}/avataaars3.png`},
      { name: 'Celia',img:`${this._avatarFolder}/avataaars4.png`},
      { name: 'Adrian',img:`${this._avatarFolder}/avataaars5.png`},
      { name: 'Papa',img:`${this._avatarFolder}/avataaars6.png`},
      { name: 'Mama',img:`${this._avatarFolder}/avataaars7.png`},
      { name: 'Tio',img:`${this._avatarFolder}/avataaars8.png`},
      { name: 'Juanito',img:`${this._avatarFolder}/avataaars9.png`},
      { name: 'Pepito',img:`${this._avatarFolder}/avataaars10.png`},
    ]
  }

  getDefaultAvatar(){
    let json_avatar = {
      name: 'Default',
      img:`${this._avatarFolder}/default.png`
    }
    return json_avatar;
  }

}
