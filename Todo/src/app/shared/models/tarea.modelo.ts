

export class TareaModel{
  constructor(
    public titulo : string = '',
    public descripcion : string = '',
    public texto : string = '',
    public severity : string = '',
    public fecha_comienzo : string = '',
    public fecha_estimada : string = '',
    public tiempo_restante : string = '',
    public id_fk_usuario : string = '',
    public id_fk_categoria : string = ''
  ){}
}
