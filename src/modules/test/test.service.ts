import { Injectable } from '@nestjs/common';

import { TestRepository } from './test.repository';

@Injectable()
export class TestService {
    constructor(private readonly testRepo: TestRepository) {}

    async create(message: string) {
        return await this.testRepo.save({ message });
    }
}
