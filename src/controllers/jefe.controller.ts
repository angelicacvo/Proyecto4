import {repository} from '@loopback/repository';
import {get, param} from '@loopback/rest';
import {Vehiculos} from './../models/vehiculos.model';
import {UsuariosRepository} from './../repositories/usuarios.repository';
import {VehiculosRepository} from './../repositories/vehiculos.repository';
import {Validations} from './../services/validations.service';

export class JefeController {
  protected validations: Validations;

  constructor(
    @repository(UsuariosRepository)
    public UsuariosRepository: UsuariosRepository,
    @repository(VehiculosRepository)
    public VehiculosRepository: VehiculosRepository,
  ) {
    this.validations = new Validations();
  }

  /**El jefe de operaciones consulta los datos detallados de un vehiculo */
  @get('/jefe/busqueda-vehiculo/{placa}')
  async busquedaDetallada(
    @param.path.string('placa') placa: typeof Vehiculos.prototype.placa,
  ) {
    this.validations.validarBusquedaDetallada(placa);
    return this.VehiculosRepository.findOne({where: {placa: placa}});
  }
}
