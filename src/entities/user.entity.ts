import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { toChecksumAddress } from 'web3-utils';

import { ETableName } from '@constants/entity.constant';

import { IUser } from '@shared/interfaces/user.interface';
import { BaseEntity } from '@shared/model/base.entity';

@Entity(ETableName.USER)
export class User extends BaseEntity implements IUser {
    @Column({ nullable: true, unique: true })
    email: string;

    @Column({ nullable: true, unique: true })
    address: string;

    @Column({ nullable: true, unique: true })
    username: string;

    @Column({ nullable: true })
    @Exclude({ toPlainOnly: true })
    password: string;

    @BeforeInsert()
    beforeInsert() {
        this.address = this.address && toChecksumAddress(this.address);
    }
}
