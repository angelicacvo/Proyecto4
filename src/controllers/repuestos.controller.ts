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
import {Repuestos} from '../models';
import {RepuestosRepository} from '../repositories';

export class RepuestosController {
  constructor(
    @repository(RepuestosRepository)
    public repuestosRepository : RepuestosRepository,
  ) {}

  @post('/repuestos')
  @response(200, {
    description: 'Repuestos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Repuestos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repuestos, {
            title: 'NewRepuestos',
            exclude: ['id'],
          }),
        },
      },
    })
    repuestos: Omit<Repuestos, 'id'>,
  ): Promise<Repuestos> {
    return this.repuestosRepository.create(repuestos);
  }

  @get('/repuestos/count')
  @response(200, {
    description: 'Repuestos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Repuestos) where?: Where<Repuestos>,
  ): Promise<Count> {
    return this.repuestosRepository.count(where);
  }

  @get('/repuestos')
  @response(200, {
    description: 'Array of Repuestos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Repuestos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Repuestos) filter?: Filter<Repuestos>,
  ): Promise<Repuestos[]> {
    return this.repuestosRepository.find(filter);
  }

  @patch('/repuestos')
  @response(200, {
    description: 'Repuestos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repuestos, {partial: true}),
        },
      },
    })
    repuestos: Repuestos,
    @param.where(Repuestos) where?: Where<Repuestos>,
  ): Promise<Count> {
    return this.repuestosRepository.updateAll(repuestos, where);
  }

  @get('/repuestos/{id}')
  @response(200, {
    description: 'Repuestos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Repuestos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Repuestos, {exclude: 'where'}) filter?: FilterExcludingWhere<Repuestos>
  ): Promise<Repuestos> {
    return this.repuestosRepository.findById(id, filter);
  }

  @patch('/repuestos/{id}')
  @response(204, {
    description: 'Repuestos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repuestos, {partial: true}),
        },
      },
    })
    repuestos: Repuestos,
  ): Promise<void> {
    await this.repuestosRepository.updateById(id, repuestos);
  }

  @put('/repuestos/{id}')
  @response(204, {
    description: 'Repuestos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() repuestos: Repuestos,
  ): Promise<void> {
    await this.repuestosRepository.replaceById(id, repuestos);
  }

  @del('/repuestos/{id}')
  @response(204, {
    description: 'Repuestos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.repuestosRepository.deleteById(id);
  }
}
