import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Sedes, SedesRelations} from '../models';

export class SedesRepository extends DefaultCrudRepository<
  Sedes,
  typeof Sedes.prototype.id,
  SedesRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Sedes, dataSource);
  }
}
