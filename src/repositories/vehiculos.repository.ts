import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Vehiculos, VehiculosRelations, Revisiones} from '../models';
import {RevisionesRepository} from './revisiones.repository';

export class VehiculosRepository extends DefaultCrudRepository<
  Vehiculos,
  typeof Vehiculos.prototype.id,
  VehiculosRelations
> {

  public readonly revisiones: HasManyRepositoryFactory<Revisiones, typeof Vehiculos.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('RevisionesRepository') protected revisionesRepositoryGetter: Getter<RevisionesRepository>,
  ) {
    super(Vehiculos, dataSource);
    this.revisiones = this.createHasManyRepositoryFactoryFor('revisiones', revisionesRepositoryGetter,);
    this.registerInclusionResolver('revisiones', this.revisiones.inclusionResolver);
  }
}
