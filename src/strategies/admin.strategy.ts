import { AuthenticationStrategy } from '@loopback/authentication';
import {service} from '@loopback/core';
import {Request, RedirectRoute, HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {ParamsDictionary} from 'express-serve-static-core';
import parseBearerToken from 'parse-bearer-token';
import {ParsedQs} from 'qs';
import {AutenticacionService} from '../services';

export class StrategyAdmin implements AuthenticationStrategy {

  name: string = 'admin';

  constructor(@service(AutenticacionService) private serviceAuthentication: AutenticacionService){}

  async authenticate(request: Request): Promise<UserProfile |undefined> {

    let token = parseBearerToken(request);

    if (token){

      const datos = this.serviceAuthentication.validarToken(token);

      if (datos){
        let user: UserProfile=Object.assign(
          {
            correo: datos.data.correo
          });
          return user

      }else{
        throw new HttpErrors[401]('Token inválido')
      }

    }else{
      throw new HttpErrors[401]('El Token no ha sido enviado')
    }

  }
}
