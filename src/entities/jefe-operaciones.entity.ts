import {Persona} from './persona.entity';

export class JefeOperaciones extends Persona {
  constructor(
    id: string,
    nombres: string,
    apellidos: string,
    cedula: string,
    telefono: string,
    fechaNacimiento: string,
    correo: string,
    contraseina: string,
  ) {
    super(
      id,
      nombres,
      apellidos,
      cedula,
      telefono,
      fechaNacimiento,
      correo,
      contraseina,
    );
  }
}
