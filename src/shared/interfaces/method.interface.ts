import { HttpStatus, Type } from '@nestjs/common';

export interface IMethod {
    method: 'GET' | 'PUT' | 'POST' | 'DELETE';
    description: string;
    path?: string;
    statusCode?: HttpStatus;
    response?: string | Function | Type<unknown> | [Function];
}
