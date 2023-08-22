import { applyDecorators, Delete, Get, HttpCode, HttpStatus, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { IMethod } from '@shared/interfaces/method.interface';

export const Method = ({ method, path, requireToken, statusCode, description, response }: IMethod) => {
    let MethodDecorator: MethodDecorator;
    switch (method) {
        case 'GET':
            MethodDecorator = Get(path);
            break;
        case 'PUT':
            MethodDecorator = Put(path);
            break;
        case 'POST':
            MethodDecorator = Post(path);
            break;
        case 'DELETE':
            MethodDecorator = Delete(path);
            break;
    }

    if (requireToken) {
        return applyDecorators(
            MethodDecorator,
            HttpCode(statusCode || HttpStatus.OK),
            ApiOperation({ summary: description }),
            ApiResponse({ status: statusCode, type: response }),
            ApiBearerAuth(),
        );
    }

    return applyDecorators(
        MethodDecorator,
        HttpCode(statusCode || HttpStatus.OK),
        ApiOperation({ summary: description }),
        ApiResponse({ status: statusCode, type: response }),
    );
};
