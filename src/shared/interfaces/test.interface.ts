import { IBaseEntity } from '@shared/interfaces/base-entity.interface';

export interface ITest extends Partial<IBaseEntity> {
    message: string;
}
