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

  obtenertareasAsyn() : Promise<any>{
    let url = this._url + this._comun
    return this._http.get(url).toPromise()

  }

  // Creación de tarea
  crearTarea( tarea : any) : Observable<any>{
    let url = this._url + this._comun
    return this._http.post<any>(url, tarea)
  }

  // Editar una tarea existente
  editarTarea(idTarea : number, tarea : any) : Observable<any>{
    let url = this._url + this._comun + `${idTarea}/`
    return this._http.put<any>(url,tarea)
  }

  // Eliminar una tarea
  eliminarTarea(idTarea:number):Observable<any>{
    let url = this._url + this._comun + `${idTarea}/`
    return this._http.delete<void>(url)
  }

  // Obtener todas las categorias
  obtenerCategorias():Observable<any>{
    let url = this._url + this._comun_cat
    return this._http.get(url)
  }


}
