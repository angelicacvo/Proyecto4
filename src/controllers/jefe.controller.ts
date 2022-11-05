import { repository } from '@loopback/repository';
import { getModelSchemaRef, HttpErrors, param, post, requestBody, response } from '@loopback/rest';
import { Sedes } from './../models/sedes.model';
import { Usuarios } from './../models/usuarios.model';
import { SedesRepository } from './../repositories/sedes.repository';
import { UsuariosRepository } from './../repositories/usuarios.repository';
import { VehiculosRepository } from './../repositories/vehiculos.repository';
import { Validations } from './../services/validations.service';

export class JefeController {
    protected validations: Validations;
    //protected mecanicoEntidad: Mecanico;


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
        const datos = {...mec, rol: 'mecanico'}

        return this.UsuariosRepository.create(datos);
    }
}