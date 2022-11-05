export class Vehiculo {
    constructor(
        public id: string | any,
        public tipoVehiculo: string,
        public marca: string,
        public anio: string,
        public modelo: string,
        public capacidadPasajeros: string,
        public cilindraje: string,
        public paisOrigen: string,
        public descripcion: string,
    ) {}
}
