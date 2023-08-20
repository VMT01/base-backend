import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Web3 from 'web3';

import { EEnvKey } from '@constants/env.constant';

@Injectable()
export class Web3Service {
    private web3: Web3;

    constructor(private readonly configService: ConfigService) {
        this.web3 = new Web3(new Web3.providers.HttpProvider(this.configService.get<string>(EEnvKey.WEB3_PROVIDER)));
    }

    recover(message: string, signature: string) {
        return this.web3.eth.accounts.recover(message, signature);
    }
}
