import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserRole } from 'src/users/dto/create-user.dto';
import { RoleGuardGuard } from './role-guard.guard';

export const Role = (...roles: UserRole[]) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard('jwt'), RoleGuardGuard),
    ApiBearerAuth(),
  );
};
