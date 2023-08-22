import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { EEnvKey } from '@constants/env.constant';

import { IJwtPayload } from '@shared/interfaces/jwt.interface';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access-strategy') {
    constructor(readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>(EEnvKey.JWT_ACCESS_SECRET_KEY),
        } as StrategyOptions);
    }

    async validate(payload: IJwtPayload) {
        return payload;
    }
}

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh-strategy') {
    constructor(readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>(EEnvKey.JWT_REFRESH_SECRET_KEY),
        } as StrategyOptions);
    }

    async validate(payload: IJwtPayload) {
        return payload;
    }
}
