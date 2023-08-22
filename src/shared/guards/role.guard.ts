import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { EGuardDecoratorKey } from '@constants/guard.constant';

import { IJwtPayload } from '@shared/interfaces/jwt.interface';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const role = this.reflector.get(EGuardDecoratorKey.ROLE, context.getClass());
        const isPublic = this.reflector.get(EGuardDecoratorKey.PUBLIC, context.getHandler());

        if (isPublic) return true;
        if (!role) return false;

        const user: IJwtPayload = context.switchToHttp().getRequest().user;
        return user.role === role;
    }
}
