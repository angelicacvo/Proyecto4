import {Persona} from './persona.entity';

export class Mecanico extends Persona {
  constructor(
    id: string,
    nombres: string,
    apellidos: string,
    cedula: string,
    telefono: string,
    fechaNacimiento: string,
    correo: string,
    contraseina: string,
    public nivelEstudios: string,
    public direccion: string,
    public rol: string = 'mecanico',
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