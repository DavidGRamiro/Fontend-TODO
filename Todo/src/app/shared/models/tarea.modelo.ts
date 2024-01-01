

export class TareaModel{
  constructor(
    public id : number | null = null,
    public titulo : string = '',
    public descripcion : string = '',
    public texto : string = '',
    public severity : string = '',
    public fecha_comienzo : string = '',
    public fecha_estimada : string = '',
    public tiempo_restante : string = '',
    public id_fk_usuario : string = '',
    public id_fk_categoria : string = '',
    public categoria : string = '',
    public usuario_asignado : string = '',
  ){}
}


export class CategoriaModel{
  constructor(
    public id : number | null = null,
    public categoria : string = '',
    public descipcion_cat : string = '',
    public color : string = ''
  ){}
}

export class PrioridadesModelo{
  constructor(
    public tipo : string = '',
    public color : string = ''
  ){}
}
