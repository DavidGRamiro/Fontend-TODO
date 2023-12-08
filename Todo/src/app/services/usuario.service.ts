import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable,  computed,  inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../shared/enums/api';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private _http = inject( HttpClient)

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






}
