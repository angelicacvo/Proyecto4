import {repository} from '@loopback/repository';
import {getModelSchemaRef, HttpErrors, param, post, put, requestBody, response} from '@loopback/rest';
import {Client} from '@loopback/testlab';
import {Cliente} from '../entities/cliente.entity';
import {Sedes, Usuarios, Vehiculos} from '../models';
import {UsuariosRepository, VehiculosRepository} from '../repositories';
import { Validations } from '../services/validations.service';

export class ClienteController {
  protected validations: Validations;
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,
    @repository(VehiculosRepository)
    public vehiculosRepository: VehiculosRepository,
  ) {
    this.validations = new Validations();
  }

  //Cliente registra sus datos personales
  @post('/cliente-registro')
  @response(200, {
    description: 'Usuarios model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
  })
  async RegitroCliente(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuarios',
            exclude: ['id', 'nivelEstudios','sedeId'],
          }),
        },
      },
    })
    usuarios:Usuarios
  ): Promise<Usuarios> {

    //El Sistema valida si la informacion cuenta con los parametros requeridos
    this.validations.validarCamposCliente(usuarios);
    const datos = {...usuarios, rol: 'Cliente'}
    //Se valida si el numero de cedula ya existe
    const cliente= await this.usuariosRepository.findOne({where:{cedula:usuarios.cedula,correo:usuarios.correo}})
    if (cliente) throw new HttpErrors[400]("Usuario ya existe");
    return this.usuariosRepository.create(usuarios);
  }


  @post('/cliente-registro-vehiculos')
  @response(200, {
    description: 'Vehiculos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vehiculos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculos, {
            title: 'NewVehiculos',
            exclude: ['id'],
          }),
        },
      },
    })
    vehiculos:Vehiculos
  ): Promise<Vehiculos> {
    //Se valida si el numero de placa ya se ha registrado
    const vehiculo= await this.vehiculosRepository.findOne({where:{placa:vehiculos.placa}})
    if (vehiculo) throw new HttpErrors[400]("Vehiculo ya existe");
    return this.vehiculosRepository.create(vehiculos);
  }

}
