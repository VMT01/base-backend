import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as CryptoJS from 'crypto-js';
import { toChecksumAddress } from 'web3-utils';

import { EEnvKey } from '@constants/env.constant';

import { User } from '@entities/user.entity';

import { UserRepository } from '@modules/user/user.repository';
import { Web3Service } from '@modules/web3/web3.service';

import { IJwtPayload } from '@shared/interfaces/jwt.interface';
import { log } from '@shared/utils/logger.util';

import { LoginAccountRequest, LoginWeb3Request, SignUpRequest } from './dtos/request.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService,
        private readonly web3Service: Web3Service,
        private readonly jwtService: JwtService,

        private readonly userRepo: UserRepository,
    ) {}

    async loginWeb3({ address, signature }: LoginWeb3Request) {
        try {
            if (!this.validateSignature(address, signature)) throw new Error('Invalid signature');
            const user = await this.validateAddress(address);
            if (!user) throw new Error('User not found');
            return await this.generateToken({ userId: user.id, role: user.role });
        } catch (err) {
            log('auth.service.ts:32', [err.message], true);
            throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
        }
    }

    async loginAccount({ username, password }: LoginAccountRequest) {
        try {
            const user = await this.validateAccount(username, password);
            if (!user) throw new Error('User not found');
            return await this.generateToken({ userId: user.id, role: user.role });
        } catch (err) {
            log('auth.service.ts:', [err.message], true);
            throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
        }
    }

    async signUp(data: SignUpRequest) {
        const user = await this.userRepo.findOneBy({
            address: data.address && toChecksumAddress(data.address),
            username: data.username,
        });
        if (user) throw new HttpException('Account existed', HttpStatus.BAD_REQUEST);

        switch (true) {
            case data.address !== undefined:
                return await this.signUpWeb3(data.address);
            case data.username !== undefined && data.password !== undefined:
                return await this.signUpAccount(data.username, data.password);
            default:
                throw new HttpException(
                    'Please provide wallet address or username and password',
                    HttpStatus.BAD_REQUEST,
                );
        }
    }

    /* -------------------- WEB3 -------------------- */

    private async validateSignature(address: string, signature: string) {
        address = toChecksumAddress(address);
        const recoverAddress = toChecksumAddress(
            this.web3Service.recover(this.configService.get<string>(EEnvKey.MESSAGE_FOR_SIGN), signature),
        );

        return address === recoverAddress;
    }

    private async validateAddress(address: string) {
        return await this.userRepo.findOneBy({ address: toChecksumAddress(address) });
    }

    private async signUpWeb3(address: string) {
        const user = new User();
        user.address = toChecksumAddress(address);
        return await this.userRepo.save(user);
    }

    /* -------------------- PASSWORD -------------------- */

    private async validateAccount(username: string, password: string) {
        password = CryptoJS.MD5(password).toString(CryptoJS.enc.Base64);
        return await this.userRepo.findOneBy({ username, password });
    }

    private async signUpAccount(username: string, password: string) {
        const user = new User();
        user.username = username;
        user.password = CryptoJS.MD5(password).toString(CryptoJS.enc.Base64);

        return await this.userRepo.save(user);
    }

    /* -------------------- UTILS -------------------- */

    private async generateToken(payload: IJwtPayload) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>(EEnvKey.JWT_ACCESS_SECRET_KEY),
                expiresIn: this.configService.get<string>(EEnvKey.JWT_ACCESS_EXPIRE_TIME) || '1d',
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>(EEnvKey.JWT_REFRESH_SECRET_KEY),
                expiresIn: this.configService.get<string>(EEnvKey.JWT_REFRESH_EXPIRE_TIME) || '7d',
            }),
        ]);
        return { accessToken, refreshToken };
    }
}
