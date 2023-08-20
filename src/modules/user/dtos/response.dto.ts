import { ApiProperty } from '@nestjs/swagger';

import { BaseResponseDto } from '@shared/dtos/response.dto';
import { IUser } from '@shared/interfaces/user.interface';

export class UserDto extends BaseResponseDto implements Omit<IUser, 'password'> {
    @ApiProperty()
    address: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    username: string;
}
