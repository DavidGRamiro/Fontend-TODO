import { HttpClient } from '@angular/common/http';
import { Injectable,  computed,  inject, signal } from '@angular/core';
import { Observable } from 'rxjs';

interface State {
  users : any;
  loading: boolean
}

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private http = inject( HttpClient)
  private url = 'http://127.0.0.1:8000/'
  private comun = 'api/usuarios/'


  // Signals, nueva función de Angular17. Private
  #state = signal<State>({
    loading: false,
    users : []
  })

  // Señales computadas. Para poder acceder a la data de la signal
  public users = computed( () => this.#state().users)

  constructor() { }

  // Obtener todos los usuarios que tenemos dados de alta en la aplicación
  getTodosUsuarios() : Observable<any> {
    let url = this.url +  this.comun
    return this.http.get<any[]>(url)
  }

}
