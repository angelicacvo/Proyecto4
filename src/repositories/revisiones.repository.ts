import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Revisiones, RevisionesRelations} from '../models';

export class RevisionesRepository extends DefaultCrudRepository<
  Revisiones,
  typeof Revisiones.prototype.id,
  RevisionesRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Revisiones, dataSource);
  }
}
