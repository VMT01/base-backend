import { Controller } from '@nestjs/common';

import { Method } from '@shared/decorators/method.decorator';

@Controller()
export class AppController {
    constructor() {}

    @Method({ method: 'GET', description: 'Hello World' })
    hello() {
        return { hello: 'world ' };
    }
}
