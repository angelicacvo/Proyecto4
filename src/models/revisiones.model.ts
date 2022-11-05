import {Entity, model, property} from '@loopback/repository';

@model()
export class Revisiones extends Entity {
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
  estadoVehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaRevision: string;

  @property({
    type: 'string',
    required: true,
  })
  horaEntrada: string;

  @property({
    type: 'string',
  })
  horaSalida?: string;


  constructor(data?: Partial<Revisiones>) {
    super(data);
  }
}

export interface RevisionesRelations {
  // describe navigational properties here
}

export type RevisionesWithRelations = Revisiones & RevisionesRelations;
