import { ERole } from '@constants/entity.constant';

export interface IJwtPayload {
    userId: string;
    role: ERole;
}
