import { Repository } from 'typeorm';

import { ETableName } from '@constants/entity.constant';

export abstract class BaseRepository<E> extends Repository<E> {
    protected abstract alias: ETableName;

    protected createQb() {
        return this.createQueryBuilder(this.alias);
    }
}
