export class Vehiculo {
    constructor(
        public id: string,
        public placa: string,
        public tipoVehiculo: string,
        public anio: string,
        public modelo: string,
        public capacidadPasajeros: string,
        public cilindraje: string,
        public paisOrigen: string,
        public descripcion: string,
    ) {}
}
