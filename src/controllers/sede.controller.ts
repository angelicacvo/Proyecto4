import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Sedes} from '../models';
import {SedesRepository} from '../repositories';

export class SedeController {
  constructor(
    @repository(SedesRepository)
    public sedesRepository : SedesRepository,
  ) {}

  @post('/sedes')
  @response(200, {
    description: 'Sedes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Sedes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sedes, {
            title: 'NewSedes',
            exclude: ['id'],
          }),
        },
      },
    })
    sedes: Omit<Sedes, 'id'>,
  ): Promise<Sedes> {
    return this.sedesRepository.create(sedes);
  }

  @get('/sedes/count')
  @response(200, {
    description: 'Sedes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Sedes) where?: Where<Sedes>,
  ): Promise<Count> {
    return this.sedesRepository.count(where);
  }

  @get('/sedes')
  @response(200, {
    description: 'Array of Sedes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sedes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Sedes) filter?: Filter<Sedes>,
  ): Promise<Sedes[]> {
    return this.sedesRepository.find(filter);
  }

  @patch('/sedes')
  @response(200, {
    description: 'Sedes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sedes, {partial: true}),
        },
      },
    })
    sedes: Sedes,
    @param.where(Sedes) where?: Where<Sedes>,
  ): Promise<Count> {
    return this.sedesRepository.updateAll(sedes, where);
  }

  @get('/sedes/{id}')
  @response(200, {
    description: 'Sedes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sedes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Sedes, {exclude: 'where'}) filter?: FilterExcludingWhere<Sedes>
  ): Promise<Sedes> {
    return this.sedesRepository.findById(id, filter);
  }

  @patch('/sedes/{id}')
  @response(204, {
    description: 'Sedes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sedes, {partial: true}),
        },
      },
    })
    sedes: Sedes,
  ): Promise<void> {
    await this.sedesRepository.updateById(id, sedes);
  }

  @put('/sedes/{id}')
  @response(204, {
    description: 'Sedes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() sedes: Sedes,
  ): Promise<void> {
    await this.sedesRepository.replaceById(id, sedes);
  }

  @del('/sedes/{id}')
  @response(204, {
    description: 'Sedes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sedesRepository.deleteById(id);
  }
}
