import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository) {}

    async getUserDetail(userId: string) {
        return await this.userRepo.findOneBy({ id: userId });
    }
}
