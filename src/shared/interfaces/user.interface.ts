import { ERole } from '@constants/entity.constant';

import { IBaseEntity } from './base-entity.interface';

export interface IUser extends Partial<IBaseEntity> {
    address: string;
    email: string;
    username: string;
    password: string;
    role: ERole;
}
