import {Entity, hasMany, model, property} from '@loopback/repository';
import {Revisiones} from './revisiones.model';
import {Vehiculos} from './vehiculos.model';

@model()
export class Usuarios extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  cedula: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
  })
  direccion?: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  contraseina: string;

  @property({
    type: 'string',
    required: true,
  })
  rol: string;

  @property({
    type: 'string',
  })
  nivelEstudios?: string;

  @property({
    type: 'string',
  })
  ciudadResidencia?: string;

  @hasMany(() => Vehiculos, {keyTo: 'usuarioId'})
  vehiculos: Vehiculos[];

  @hasMany(() => Revisiones, {keyTo: 'mecanicoId'})
  revisiones: Revisiones[];

  @property({
    type: 'string',
  })
  sedeId?: string;

  constructor(data?: Partial<Usuarios>) {
    super(data);
  }
}

export interface UsuariosRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuarios & UsuariosRelations;
