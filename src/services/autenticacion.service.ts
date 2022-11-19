import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Credenciales, Usuarios} from '../models';
import {UsuariosRepository} from '../repositories';
const jwt= require ('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */
  @repository(UsuariosRepository) public usuarioRepository: UsuariosRepository) {}

  /*
   * Add service methods here
   */

  async autenticar(credenciales:Credenciales):Promise <any>{
    try {
      let user= await this.usuarioRepository.findOne({

        where:{
          correo: credenciales.correo,
        contraseina: credenciales.contraseina
        }

      });
      if(user){
        return user;
      }else{
        return null;
      }
    } catch (error) {

    }
  }

  async generarToken(usuario:Usuarios) : Promise<string> {
    let token = await jwt.sign(
      {
        data:{
          correo : usuario.correo,
          contraseina: usuario.contraseina
        }
      },
        'XXMIN56',
    );
    return token;
  }
  validarToken(token: string):any{
    try {
      let dataToken= jwt.verify(token, 'XXMIN56');
      return dataToken;
    } catch (error) {
      return null;

    }
  }
}

