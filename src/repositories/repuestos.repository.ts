import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Repuestos, RepuestosRelations, Vehiculos} from '../models';
import {VehiculosRepository} from './vehiculos.repository';

export class RepuestosRepository extends DefaultCrudRepository<
  Repuestos,
  typeof Repuestos.prototype.id,
  RepuestosRelations
> {

  public readonly vehiculos: BelongsToAccessor<Vehiculos, typeof Repuestos.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculosRepository') protected vehiculosRepositoryGetter: Getter<VehiculosRepository>,
  ) {
    super(Repuestos, dataSource);
    this.vehiculos = this.createBelongsToAccessorFor('vehiculos', vehiculosRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
