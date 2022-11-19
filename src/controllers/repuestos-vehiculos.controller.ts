import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Repuestos,
  Vehiculos,
} from '../models';
import {RepuestosRepository} from '../repositories';

export class RepuestosVehiculosController {
  constructor(
    @repository(RepuestosRepository)
    public repuestosRepository: RepuestosRepository,
  ) { }

  @get('/repuestos/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Vehiculos belonging to Repuestos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculos)},
          },
        },
      },
    },
  })
  async getVehiculos(
    @param.path.string('id') id: typeof Repuestos.prototype.id,
  ): Promise<Vehiculos> {
    return this.repuestosRepository.vehiculos(id);
  }
}
