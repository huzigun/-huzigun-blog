import { Controller, Post, UseGuards, Request, Response, Body, Get } from '@nestjs/common';
import { request } from 'express';
import { Public } from 'src/common/decorators/skip-auth.decorator';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private readonly usersService: UsersService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request: any, @Response({ passthrough: true }) response) {
    const user = request.user;
    const { accessToken, ...accessOptions } = this.authService.getCookieWithJwtAccessToken(user.id);
    const { refreshToken, ...refreshOptions } = this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    // const { token, ...options } = await this.authService.login(request.user);
    response.cookie('Authentication', accessToken, accessOptions);
    response.cookie('Refresh', refreshToken, refreshOptions);
    return user;
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('logout')
  async logout(@Request() request, @Response({ passthrough: true }) response) {
    // const { token, ...options } = await this.authService.logout();
    const { accessOptions, refreshOptions } = this.authService.getCookiesForLogOut();
    await this.usersService.removeRefreshToken(request.user.id);
    response.cookie('Authentication', '', accessOptions);
    response.cookie('Refresh', '', refreshOptions);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Request() request, @Response({ passthrough: true }) response) {
    const user = request.user;
    const { accessToken, ...accessOptions } = this.authService.getCookieWithJwtAccessToken(user.id);
    response.cookie('Authentication', accessToken, accessOptions);
    return user;
  }

  @Public()
  @Post('register')
  async register(@Body() user: User): Promise<any> {
    return this.authService.register(user);
  }
}
