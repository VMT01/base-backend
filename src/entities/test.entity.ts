import { Column, Entity } from 'typeorm';

import { ETableName } from '@constants/entity.constant';

import { ITest } from '@shared/interfaces/test.interface';
import { BaseEntity } from '@shared/model/base.entity';

@Entity(ETableName.TEST)
export class Test extends BaseEntity implements ITest {
    @Column()
    message: string;
}
