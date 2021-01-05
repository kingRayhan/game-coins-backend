import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/auth/Role.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ApiPagination } from 'src/shared/decorators/ApiPagination.decorator';
import { PaginationDTO } from 'src/shared/PaginationDTO';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Role(UserRole.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiPagination()
  @Role(UserRole.ADMIN, UserRole.MODERATOR)
  findAll(@Query() pagination: PaginationDTO) {
    return this.usersService.findAll(pagination);
  }

  @Get(':id')
  @Role(UserRole.ADMIN, UserRole.MODERATOR)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @Role(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Role(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
