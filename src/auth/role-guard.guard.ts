import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/users/dto/create-user.dto';

@Injectable()
export class RoleGuardGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): any {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler());
    const { user } = request.user;
    return roles.includes(user.role);
  }
}
