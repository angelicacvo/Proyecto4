import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Vehiculos} from './vehiculos.model';

@model()
export class Repuestos extends Entity {
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
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  referencia: string;

  @property({
    type: 'string',
    required: true,
  })
  cantidad: string;

  @belongsTo(() => Vehiculos)
  vehiculosId: string;

  constructor(data?: Partial<Repuestos>) {
    super(data);
  }
}

export interface RepuestosRelations {
  // describe navigational properties here
}

export type RepuestosWithRelations = Repuestos & RepuestosRelations;
