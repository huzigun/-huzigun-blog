import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { User } from 'src/users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, plainTextPassword: string): Promise<any> {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.vertifyPassword(plainTextPassword, user.password);
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  private async vertifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatch = await compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatch) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  // async login(user: User) {
  //   const payload = { email: user.email, id: user.id };
  //   const token = this.jwtService.sign(payload);
  //   return {
  //     token,
  //     domain: 'localhost',
  //     path: '/',
  //     httpOnly: true,
  //     maxAge: Number(this.configService.get('JWT_EXPIRATION_TIME')) * 1000,
  //   };
  // }

  // async logout() {
  //   return {
  //     token: '',
  //     domain: 'localhost',
  //     path: '/',
  //     httpOnly: true,
  //     maxAge: 0,
  //   };
  // }

  async register(user: User) {
    const hashedPassword = await hash(user.password, 10);
    try {
      const { password, ...resultUser } = await this.usersService.createNewUser({
        ...user,
        password: hashedPassword,
      });

      return resultUser;
    } catch (error) {
      if (error?.code === 'ER_DUP_ENTRY') {
        throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
      }
    }
  }

  getCookieWithJwtAccessToken(id: number) {
    const payload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
    });

    return {
      accessToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      maxAge: Number(this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')) * 1000,
    };
  }

  getCookieWithJwtRefreshToken(id: number) {
    const payload = { id };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`,
    });

    return {
      refreshToken: token,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      // maxAge: Number(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')) * 1000,
    };
  }

  getCookiesForLogOut() {
    return {
      accessOptions: {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
      refreshOptions: {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
    };
  }
}
