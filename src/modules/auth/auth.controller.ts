import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { EControllerPath, EControllerTag } from '@constants/controller.constant';
import { EMethodDescription } from '@constants/swagger.constant';

import { UserDto } from '@modules/user/dtos/response.dto';

import { Method } from '@shared/decorators/method.decorator';

import { AuthService } from './auth.service';
import { LoginAccountRequest, LoginWeb3Request, SignUpRequest } from './dtos/request.dto';
import { AuthResponse } from './dtos/response.dto';

@Controller(EControllerPath.AUTH)
@ApiTags(EControllerTag.AUTH)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Method({
        method: 'POST',
        path: '/login-web3',
        description: EMethodDescription.AUTH.LOGIN,
        response: AuthResponse,
    })
    loginWeb3(@Body() body: LoginWeb3Request) {
        return this.authService.loginWeb3(body);
    }

    @Method({
        method: 'POST',
        path: '/login-account',
        description: EMethodDescription.AUTH.LOGIN,
        response: AuthResponse,
    })
    loginAccount(@Body() body: LoginAccountRequest) {
        return this.authService.loginAccount(body);
    }

    @Method({
        method: 'POST',
        path: '/sign-up',
        description: EMethodDescription.AUTH.SIGN_UP,
        response: UserDto,
    })
    signup(@Body() body: SignUpRequest) {
        return this.authService.signUp(body);
    }
}
