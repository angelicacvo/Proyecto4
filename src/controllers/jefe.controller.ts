import { repository } from '@loopback/repository';
import { get, getModelSchemaRef, HttpErrors, param, post, requestBody, response } from '@loopback/rest';
import { Usuarios } from './../models/usuarios.model';
import { Vehiculos } from './../models/vehiculos.model';
import { SedesRepository } from './../repositories/sedes.repository';
import { UsuariosRepository } from './../repositories/usuarios.repository';
import { VehiculosRepository } from './../repositories/vehiculos.repository';
import { Validations } from './../services/validations.service';

interface infoVehiculoGeneral {
    tipoVehiculo: string | any;
    marca: string | any;
    descripcion: string | any;
}

export class JefeController {
    protected validations: Validations;

    constructor(
        @repository(UsuariosRepository)
        public UsuariosRepository: UsuariosRepository,
        @repository(VehiculosRepository)
        public VehiculosRepository: VehiculosRepository,
        @repository(SedesRepository)
        public SedesRepository: SedesRepository,
    ) {
        this.validations = new Validations();
    }

    /** El jefe de opreacciones agregra un usuario */
    @post('/jefe/registrar-usuario')
    @response(200, {
        description: 'Agregar Propietario de un vehiculo es decir un cliente',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Usuarios, {
                    exclude: ['sedeId', 'contraseina', 'nivelEstudios', 'direccion', 'revisiones', 'vehiculos'],
                }),
            },
        },
    })
    async registrarCliente(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Usuarios, {
                        title: 'CrearCliente',
                        exclude: ['id', 'nivelEstudios', 'direccion', 'rol'],
                    }),
                },
            },
        })
        usuario: Usuarios,
    ): Promise<Usuarios> {
        // Verificar que el usuario no exista
        const user = await this.UsuariosRepository.findOne({
            where: { correo: usuario.correo, cedula: usuario.cedula },
        });
        if (user) throw new HttpErrors[400]('El usuario que intentas registrar ya existe');

        // verificar que la sede exista
        const sede = await this.SedesRepository.findOne({ where: { id: usuario.sedeId } });
        if (!sede) throw new HttpErrors[400]('La sede a la que pertenece el usuario no existe');

        // validar campos del usuario
        this.validations.validarCamposCliente(usuario);
        return this.UsuariosRepository.create(usuario);
    }

    /** Registra un nuevo vehiculo */
    @post('/jefe/agregar-vehiculo')
    @response(200, {
        description: 'Registra un vehiculo',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Vehiculos, {
                    exclude: ['revisiones'],
                }),
            },
        },
    })
    async registarVehiculo(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Vehiculos, {
                        title: 'CrearVehiculo',
                        exclude: ['id'],
                    }),
                },
            },
        })
        vehiculo: Vehiculos,
    ): Promise<Vehiculos> {
        // validar campos del vehiculo
        this.validations.validarCamposVehiculo(vehiculo);

        // verificar que e vehiculo no esista
        const carro = await this.VehiculosRepository.findOne({ where: { placa: vehiculo.placa } });
        if (carro) throw new HttpErrors[400]('El vehiculo ya existe');

        // Verificar que el usuario deño del vehiculo exista
        const propietario = await this.UsuariosRepository.findOne({ where: { id: vehiculo.usuarioId } });
        if (!propietario) throw new HttpErrors[400]('El dueño de este vehiculo no está registrado');

        return this.VehiculosRepository.create(vehiculo);
    }

    /**El jefe de operaciones consulta los datos detallados de un vehiculo */
    @get('/jefe/busqueda-vehiculo/{placa}')
    async busquedaDetallada(@param.path.string('placa') placa: typeof Vehiculos.prototype.placa) {
        this.validations.validarBusquedaDetallada(placa);
        return this.VehiculosRepository.findOne({ where: { placa: placa } });
    }

    /**El jefe de operaciones consulta los datos detallados de un vehiculo */
    @get('/jefe/busquedaGeneralVehiculo/{placa}')
    async busquedaGeneral(@param.path.string('placa') placa: string) {
        this.validations.validarbusquedaGeneral(placa);
        const veh = await this.VehiculosRepository.findOne({ where: { placa: placa } });
        if (!veh) throw new HttpErrors[400]('Vehiculo no existe');
        const data: infoVehiculoGeneral = {
            tipoVehiculo: veh?.tipoVehiculo,
            marca: veh?.marca,
            descripcion: veh?.descripcion,
        };
        return data;
    }

    /** El jefe de opreacciones agregra un mecanico */
    @post('/jefe/agregar-mecanico')
    @response(200, {
        description: 'Agregar mecanico',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Usuarios, { exclude: ['sedeId', 'contraseina', 'direccion'] }),
            },
        },
    })
    async crearMecanico(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Usuarios, {
                        title: 'CrearMecanico',
                        exclude: ['id', 'rol', 'ciudadResidencia'],
                    }),
                },
            },
        })
        mec: Usuarios,
    ): Promise<Usuarios> {
        // Verificar que el usuario no exista
        const user = await this.UsuariosRepository.findOne({ where: { correo: mec.correo, cedula: mec.cedula } });
        if (user) throw new HttpErrors[400]('El usuario que eintentas registrar ya existe');

        // validar campos del usuario
        this.validations.validarCamposCliente(mec);

        //Insancia mecanico
        //this.mecanicoEntidad = new Mecanico('', mec.nombres, mec.apellidos, mec.cedula, mec.telefono, mec.fechaNacimiento, mec.correo, mec.contraseina, mec.nivelEstudios, mec.direccion)
        const datos = { ...mec, rol: 'mecanico' };

        return this.UsuariosRepository.create(datos);
    }
}
