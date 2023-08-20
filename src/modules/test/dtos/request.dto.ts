import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { ITest } from '@shared/interfaces/test.interface';

export class CreateTestRequest implements ITest {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    message: string;
}
