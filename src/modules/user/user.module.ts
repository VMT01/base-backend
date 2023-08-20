import { Module } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
    imports: [],
    controllers: [],
    providers: [UserService, UserRepository],
    exports: [UserRepository],
})
export class UserModule {}
