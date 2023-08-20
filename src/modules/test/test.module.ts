import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Test } from '@entities/test.entity';

import { TestController } from './test.controller';
import { TestRepository } from './test.repository';
import { TestService } from './test.service';

@Module({
    imports: [TypeOrmModule.forFeature([Test])],
    controllers: [TestController],
    providers: [TestService, TestRepository],
    exports: [],
})
export class TestModule {}
