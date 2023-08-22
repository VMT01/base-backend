import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { EGuardDecoratorKey } from '@constants/guard.constant';

@Injectable()
export class AccessGuard extends AuthGuard('access-strategy') {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.get<boolean>(EGuardDecoratorKey.PUBLIC, context.getHandler());
        if (isPublic) return true;
        return super.canActivate(context);
    }
}

@Injectable()
export class RefreshGuard extends AuthGuard('refresh-strategy') {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.get<string>(EGuardDecoratorKey.PUBLIC, context.getHandler());
        if (isPublic) return true;
        return super.canActivate(context);
    }
}
