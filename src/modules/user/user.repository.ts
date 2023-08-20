import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { ETableName } from '@constants/entity.constant';

import { User } from '@entities/user.entity';

import { BaseRepository } from '@shared/model/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
    protected alias: ETableName = ETableName.USER;

    constructor(private readonly dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }
}
