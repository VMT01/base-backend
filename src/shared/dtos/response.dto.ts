import { ApiProperty } from '@nestjs/swagger';

import { IBaseEntity } from '@shared/interfaces/base-entity.interface';

export class BaseResponseDto implements IBaseEntity {
    @ApiProperty()
    id: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
