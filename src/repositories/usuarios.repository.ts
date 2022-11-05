import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Usuarios, UsuariosRelations, Vehiculos, Revisiones} from '../models';
import {VehiculosRepository} from './vehiculos.repository';
import {RevisionesRepository} from './revisiones.repository';

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.id,
  UsuariosRelations
> {

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculos, typeof Usuarios.prototype.id>;

  public readonly revisiones: HasManyRepositoryFactory<Revisiones, typeof Usuarios.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('VehiculosRepository') protected vehiculosRepositoryGetter: Getter<VehiculosRepository>, @repository.getter('RevisionesRepository') protected revisionesRepositoryGetter: Getter<RevisionesRepository>,
  ) {
    super(Usuarios, dataSource);
    this.revisiones = this.createHasManyRepositoryFactoryFor('revisiones', revisionesRepositoryGetter,);
    this.registerInclusionResolver('revisiones', this.revisiones.inclusionResolver);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculosRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
