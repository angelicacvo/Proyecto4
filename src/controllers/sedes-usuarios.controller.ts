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
  Sedes,
  Usuarios,
} from '../models';
import {SedesRepository} from '../repositories';

export class SedesUsuariosController {
  constructor(
    @repository(SedesRepository) protected sedesRepository: SedesRepository,
  ) { }

  @get('/sedes/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Sedes has many Usuarios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuarios>,
  ): Promise<Usuarios[]> {
    return this.sedesRepository.usuarios(id).find(filter);
  }

  @post('/sedes/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Sedes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sedes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuariosInSedes',
            exclude: ['id'],
            optional: ['sedeId']
          }),
        },
      },
    }) usuarios: Omit<Usuarios, 'id'>,
  ): Promise<Usuarios> {
    return this.sedesRepository.usuarios(id).create(usuarios);
  }

  @patch('/sedes/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Sedes.Usuarios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Partial<Usuarios>,
    @param.query.object('where', getWhereSchemaFor(Usuarios)) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.sedesRepository.usuarios(id).patch(usuarios, where);
  }

  @del('/sedes/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Sedes.Usuarios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuarios)) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.sedesRepository.usuarios(id).delete(where);
  }
}
