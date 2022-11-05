import {Persona} from './persona.entity';

export class Cliente extends Persona {
  constructor(
    id: string,
    nombres: string,
    apellidos: string,
    cedula: string,
    telefono: string,
    fechaNacimiento: string,
    correo: string,
    contraseina: string,
    public ciudadResidencia: string,
    public rol: string = 'cliente',
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
