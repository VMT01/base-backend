import { ApiProperty } from '@nestjs/swagger';
import { IsHexadecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { IUser } from '@shared/interfaces/user.interface';

export class LoginWeb3Request implements Partial<IUser> {
    @ApiProperty()
    @IsHexadecimal()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @IsHexadecimal()
    @IsNotEmpty()
    signature: string;
}

export class LoginAccountRequest implements Partial<IUser> {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}

export class SignUpRequest implements Partial<IUser> {
    @ApiProperty({ required: false })
    @IsHexadecimal()
    @IsOptional()
    address?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    username?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    password?: string;
}
