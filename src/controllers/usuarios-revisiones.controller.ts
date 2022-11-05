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
  Usuarios,
  Revisiones,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosRevisionesController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Array of Usuarios has many Revisiones',
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
    return this.usuariosRepository.revisiones(id).find(filter);
  }

  @post('/usuarios/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Usuarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Revisiones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuarios.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revisiones, {
            title: 'NewRevisionesInUsuarios',
            exclude: ['id'],
            optional: ['mecanicoId']
          }),
        },
      },
    }) revisiones: Omit<Revisiones, 'id'>,
  ): Promise<Revisiones> {
    return this.usuariosRepository.revisiones(id).create(revisiones);
  }

  @patch('/usuarios/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Usuarios.Revisiones PATCH success count',
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
    return this.usuariosRepository.revisiones(id).patch(revisiones, where);
  }

  @del('/usuarios/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Usuarios.Revisiones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Revisiones)) where?: Where<Revisiones>,
  ): Promise<Count> {
    return this.usuariosRepository.revisiones(id).delete(where);
  }
}
