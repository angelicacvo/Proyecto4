import { repository } from '@loopback/repository';
import { getModelSchemaRef, HttpErrors, param, get, requestBody, response } from '@loopback/rest';
import { Cliente } from './../entities/cliente.entity';
import { Sedes } from './../models/sedes.model';
import { Usuarios } from './../models/usuarios.model';
import { SedesRepository } from './../repositories/sedes.repository';
import { UsuariosRepository } from './../repositories/usuarios.repository';
import { VehiculosRepository } from './../repositories/vehiculos.repository';
import { Validations } from './../services/validations.service';
import { vehiculo } from './../entities/vehiculo.entity';
import { Vehiculos } from './../models/vehiculos.model';

interface infoVehiculoGeneral {
  tipoVehiculo: string | any,
  marca: string | any,
  descripcion: string | any,
}

export class JefeController {
    protected validations: Validations;
    protected vehiculoEntidad: vehiculo;
  
    constructor(
      @repository(UsuariosRepository)
      public UsuariosRepository: UsuariosRepository,
      @repository(VehiculosRepository)
          public VehiculosRepository: VehiculosRepository,
    ) {
      this.validations= new Validations();
    }


  
  /**El jefe de operaciones consulta los datos detallados de un vehiculo */
  @get('/jefe/busquedaGeneralVehiculo/{placa}')
  async busquedaGeneral(
    @param.path.string('placa') placa: string,
      ){
         this.validations.validarbusquedaGeneral(placa)
         const veh = await this.VehiculosRepository.findOne({where: {placa:placa}})
         if (!veh) throw new HttpErrors[400]("Vehiculo no existe");       
         const data: infoVehiculoGeneral={
          tipoVehiculo : veh?.tipoVehiculo,
          marca : veh?.marca,
          descripcion :veh?.descripcion
        }
         return data
      }
    }



    