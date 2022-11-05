import { HttpErrors } from '@loopback/rest';
import { Cliente } from './../entities/cliente.entity';
import { Vehiculo } from './../entities/vehiculo.entity';
import { Usuarios } from './../models/usuarios.model';

export class Validations {
    constructor() {}

    // validar campos de usuario
    public validarCamposCliente(data: Cliente | Usuarios): void {
        const { nombres, apellidos, cedula, correo, telefono, ciudadResidencia } = data;

        if (!nombres || !nombres.match(/^[a-z]+(\s[a-z]+){0,1}$/gi))
            throw new HttpErrors[400]('Formato de nombres inválido, solo se permiten letras y espacio en blanco');

        if (!apellidos || !apellidos.match(/^[a-z]+(\s[a-z]+){0,1}$/gi))
            throw new HttpErrors[400]('Formato de los apellidos inválido, solo se permiten eltras y espacios en blanco');

        if (!cedula || !cedula.match(/^[0-9]{6,12}/gi)) throw new HttpErrors[400]('La cedula ingresada no es válida');

        if (
            !correo ||
            !correo.match(/^[a-z0-9_-]+(?:\.[a-z0-9_-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/gi)
        )
            throw new HttpErrors[400]('Formato del correo electronico inválido');

        if (!telefono || !telefono.match(/^[0-9]{10}/gi)) throw new HttpErrors[400]('El teléfono ingresado no es válido');

        if (!ciudadResidencia || !ciudadResidencia.match(/^[a-z]+(\s[a-z]+){0,}/gi))
            throw new HttpErrors[400]('La ciudad ingresada no es válida');
    }

    /** Vlidar campos de un vehiculo */
    public validarCamposVehiculo(data: Vehiculo | any): void {
        const { placa, tipoVehiculo, anio, modelo, capacidadPasajeros, cilindraje, paisOrigen, descripcion } = data;
        const expNombre = /^[a-z]+(\s[a-z]+){0,}/gi;

        if (!placa || !placa.match(/^[A-Z]{3}[0-9]{3}$/g)) throw new HttpErrors[400]('La placa ingresada no es valida');
        if (!tipoVehiculo || !tipoVehiculo.match(expNombre))
            throw new HttpErrors[400]('El tipo de vehiculo contiene caracteres no permitidos');
        if (!anio || !anio.match(/^[0-9]{4}$/gi)) throw new HttpErrors[400]('El año ingresado no es válido');
        if (!modelo || !modelo.match(/^[0-9]{4}$/gi)) throw new HttpErrors[400]('El modelo ingresado no es válido');
        if (!capacidadPasajeros || !capacidadPasajeros.match(/^[0-9]{2}$/gi)) throw new HttpErrors[400]('Capacidad de pasajeros no valida');
        if (!cilindraje || !cilindraje.match(/^[0-9]+$/gi)) throw new HttpErrors[400]('Cilidraje no valido');
        if (!paisOrigen || !paisOrigen.match(expNombre)) throw new HttpErrors[400]('Pais de origen no valido');
        if (!descripcion || descripcion.length < 5)
            throw new HttpErrors[400]('Necesitamos una descripcion del vehiculo de minimo 5 caracteres');
    }
}
