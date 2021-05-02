import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/skip-auth.decorator';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':username')
  findOne(@Param() username: string): Promise<User> {
    return this.usersService.findOne(username);
  }

  @Delete(':id')
  async remove(@Param() id: string): Promise<void> {
    await this.usersService.remove(id);
  }

  @Public()
  @Post()
  async create(@Body() user: User): Promise<void> {
    await this.usersService.createNewUser(user);
  }
}
