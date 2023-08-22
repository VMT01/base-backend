import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { ERole } from '@constants/entity.constant';
import { EGuardDecoratorKey } from '@constants/guard.constant';

import { AccessGuard, RefreshGuard } from '@shared/guards/jwt.guard';
import { RoleGuard } from '@shared/guards/role.guard';

const PublicPermission = () => SetMetadata(EGuardDecoratorKey.PUBLIC, true);

const UserPermission = () => applyDecorators(IsUser(), UseGuards(AccessGuard, RoleGuard));

const AdminPermission = () => applyDecorators(IsAdmin(), UseGuards(AccessGuard, RoleGuard));

const RefreshPermission = () => UseGuards(RefreshGuard);

const IsAdmin = () => SetMetadata(EGuardDecoratorKey.ROLE, ERole.ADMIN);

const IsUser = () => SetMetadata(EGuardDecoratorKey.ROLE, ERole.USER);

export { PublicPermission, UserPermission, AdminPermission, RefreshPermission };
