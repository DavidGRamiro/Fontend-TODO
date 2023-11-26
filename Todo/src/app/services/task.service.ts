import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../shared/enums/api';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _http = inject(HttpClient)
  private _url = API.URL_API
  private _comun = API.TAREAS

  // URL para obtener las categorias.
  private _comun_cat = API.CATEGORIAS


  // Obtener todas las tareas que tenemos listadas
  obtenerTareas( id:number = 0) : Observable<any>{
    let url = this._url + this._comun
    return this._http.get(url)
  }

  // Obtener todas las categorias
  obtenerCategorias():Observable<any>{
    let url = this._url + this._comun_cat
    return this._http.get(url)
  }


}
