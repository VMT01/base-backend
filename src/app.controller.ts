import { Controller } from '@nestjs/common';

import { EMethodDescription } from '@constants/swagger.constant';

import { Method } from '@shared/decorators/method.decorator';

@Controller()
export class AppController {
    constructor() {}

    @Method({ method: 'GET', description: EMethodDescription.DEFAULT })
    hello() {
        return { hello: 'world ' };
    }
}
