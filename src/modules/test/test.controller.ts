import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { EControllerPath, EControllerTag } from '@constants/controller.constant';
import { EMethodDescription } from '@constants/swagger.constant';

import { Method } from '@shared/decorators/method.decorator';

import { CreateTestRequest } from './dtos/request.dto';
import { TestService } from './test.service';

@Controller(EControllerPath.TEST)
@ApiTags(EControllerTag.TEST)
export class TestController {
    constructor(private readonly testService: TestService) {}

    @Method({ method: 'POST', description: EMethodDescription.TEST.CREATE })
    create(@Body() { message }: CreateTestRequest) {
        return this.testService.create(message);
    }
}
