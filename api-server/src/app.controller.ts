import { Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { Public } from './common/decorators/skip-auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Public()
  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() request: any, @Response({ passthrough: true }) response) {
  //   const token = await this.authService.login(request.user);
  //   response.cookie('Authentication', token, {
  //     domain: 'localhost',
  //     path: '/',
  //     httpOnly: true,
  //   });
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() request) {
    return request.user;
  }
}
