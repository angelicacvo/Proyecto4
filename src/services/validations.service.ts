import {HttpErrors} from '@loopback/rest';
import {Cliente} from './../entities/cliente.entity';
import { vehiculos } from '../entities/vehiculo.entity';
import {Usuarios} from '../models';

export class Validations {
  constructor() {}

  // validar campos de usuario
  public validarCamposCliente(data: Cliente|Usuarios): void {
    const {nombres, apellidos, cedula, correo, telefono, ciudadResidencia,} =
      data;

    if (!nombres || !nombres.match(/^[a-z]+(\s[a-z]+){0,1}$/gi))
      throw new HttpErrors[400](
        'Formato de nombres inválido, solo se permiten letras y espacio en blanco',
      );

    if (!apellidos || !apellidos.match(/^[a-z]+(\s[a-z]+){0,1}$/gi))
      throw new HttpErrors[400](
        'Formato de los apellidos inválido, solo se permiten eltras y espacios en blanco',
      );

    if (!cedula || !cedula.match(/^[0-9]{6,12}/gi))
      throw new HttpErrors[400]('La cedula ingresada no es válida');

    if (
      !correo ||
      !correo.match(
        /^[a-z0-9_-]+(?:\.[a-z0-9_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/gi,
      )
    )
      throw new HttpErrors[400]('Formato del correo electronico inválido');

    if (!telefono || !telefono.match(/^[0-9]{10}/gi))
      throw new HttpErrors[400]('El teléfono ingresado no es válido');

    if (!ciudadResidencia || !ciudadResidencia.match(/^[a-z]+(\s[a-z]+){0,}/gi))
      throw new HttpErrors[400]('La ciudad ingresada no es válida');
    }

    //Validar campos vehiculo
    public validarCamposVehiculo(data: Omit <vehiculos,'id'>): void {
      const{placa,marca,tipoVehiculo,anio,modelo,capacidadPasajeros,cilindraje,paisOrigen,descripcion,}
      =data;

    }

}
