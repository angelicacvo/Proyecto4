// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {getModelSchemaRef, HttpErrors, post, requestBody, response} from '@loopback/rest';
import { Credenciales, Usuarios } from '../models';
import {UsuariosRepository} from '../repositories';
import {AutenticacionService} from '../services';


export class LoginController {
  constructor(
   @service(AutenticacionService) private autenticacionService: AutenticacionService
  ) {}

  @post('/login')
  @response(200,{
    description: 'Login instance',
    content: {'application/json':{schema: getModelSchemaRef(Credenciales)}},
    })
    async login(
      @requestBody()credenciales: Credenciales): Promise<any>
      {
        let usuario =await this.autenticacionService.autenticar(credenciales);
        console.log(usuario);
        if(usuario){
        let token = await this.autenticacionService.generarToken(usuario);

        if (token){
          delete usuario ['contraseina'];
          return{
            data: usuario,
            token:token
          }
        }else{
          throw new HttpErrors[401]('No se pudo generar el Token');
        }
        }else{
          throw new HttpErrors[401]('Datos incorrectos');
        }
      }
    }

