import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Vehiculos,
  Revisiones,
} from '../models';
import {VehiculosRepository} from '../repositories';

export class VehiculosRevisionesController {
  constructor(
    @repository(VehiculosRepository) protected vehiculosRepository: VehiculosRepository,
  ) { }

  @get('/vehiculos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Array of Vehiculos has many Revisiones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Revisiones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Revisiones>,
  ): Promise<Revisiones[]> {
    return this.vehiculosRepository.revisiones(id).find(filter);
  }

  @post('/vehiculos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Vehiculos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Revisiones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revisiones, {
            title: 'NewRevisionesInVehiculos',
            exclude: ['id'],
            optional: ['vehiculoId']
          }),
        },
      },
    }) revisiones: Omit<Revisiones, 'id'>,
  ): Promise<Revisiones> {
    return this.vehiculosRepository.revisiones(id).create(revisiones);
  }

  @patch('/vehiculos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Vehiculos.Revisiones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revisiones, {partial: true}),
        },
      },
    })
    revisiones: Partial<Revisiones>,
    @param.query.object('where', getWhereSchemaFor(Revisiones)) where?: Where<Revisiones>,
  ): Promise<Count> {
    return this.vehiculosRepository.revisiones(id).patch(revisiones, where);
  }

  @del('/vehiculos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Vehiculos.Revisiones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Revisiones)) where?: Where<Revisiones>,
  ): Promise<Count> {
    return this.vehiculosRepository.revisiones(id).delete(where);
  }
}
