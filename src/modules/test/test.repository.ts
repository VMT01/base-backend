import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { ETableName } from '@constants/entity.constant';

import { Test } from '@entities/test.entity';

import { BaseRepository } from '@shared/model/base.repository';

@Injectable()
export class TestRepository extends BaseRepository<Test> {
    protected alias: ETableName = ETableName.TEST;

    constructor(private readonly dataSource: DataSource) {
        super(Test, dataSource.createEntityManager());
    }
}
