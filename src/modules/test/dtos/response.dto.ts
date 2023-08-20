import { ApiProperty } from '@nestjs/swagger';

import { BaseResponseDto } from '@shared/dtos/response.dto';
import { ITest } from '@shared/interfaces/test.interface';

export class TestDto extends BaseResponseDto implements ITest {
    @ApiProperty()
    message: string;
}
