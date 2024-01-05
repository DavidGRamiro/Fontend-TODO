import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable,  computed,  inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../shared/enums/api';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private _http = inject( HttpClient)

  constructor(){}

  private _url = API.URL_API
  private _comun = API.USERS
  // URL para los roles
  private _comun_rol = API.ROL

  // Obtener todos los usuarios que tenemos dados de alta en la aplicación
  getTodosUsuarios() : Observable<any> {
    let url = this._url +  this._comun
    return this._http.get<any[]>(url)
  }

  altaUsuario( data : any): Observable<any>{
    let url = this._url + this._comun
    return this._http.post(url, data)
  }

  // Obtener todos los roles de usuario
  getRoles():Observable<any>{
    let url = this._url + this._comun_rol
    return this._http.get(url)
  }

  // Hacer login de usuario
  login( usuario : any):Observable<any>{
    let url = this._url + this._comun + 'login/'
    return this._http.post(url, usuario)
  }

  // Obtener la información del token del usuario
  getInfoToken( token : any):Observable<any>{
    let url = this._url +  this._comun + 'auth/'
    const headers = new HttpHeaders({'Authorization': `Token ${token}`})
    return this._http.get<any>( url, { headers})
  }

  // Actualización de los datos de un usuario
  updateUsuario( usuario : any) : Observable<any>{
    let url = this._url + this._comun + usuario.id + '/'
    return this._http.put<any>(url, usuario)
  }

  // Logout del usuario
  logout() : Observable<any>{
    let url = this._url + this._comun + 'logout/'
    return this._http.get<any>(url)
  }

  // Método para actualizar solo el avatar del usuario
  setAvatar( avatar : any){
    let url = this._url + this._comun + 'update_avatar/'
    return this._http.put(url,avatar)
  }


}
