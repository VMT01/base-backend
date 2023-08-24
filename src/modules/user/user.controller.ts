import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { EControllerPath, EControllerTag } from '@constants/controller.constant';
import { EMethodDescription } from '@constants/swagger.constant';

import { Method } from '@shared/decorators/method.decorator';
import { UserPermission } from '@shared/decorators/permission.decorator';
import { UserPayload } from '@shared/decorators/user-payload.decorator';
import { IJwtPayload } from '@shared/interfaces/jwt.interface';

import { UserService } from './user.service';

@Controller(EControllerPath.USER)
@ApiTags(EControllerTag.USER)
@UserPermission()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Method({ method: 'GET', requireToken: true, description: EMethodDescription.USER.DETAIL })
    getUserDetail(@UserPayload() { userId }: IJwtPayload) {
        return this.userService.getUserDetail(userId);
    }
}
