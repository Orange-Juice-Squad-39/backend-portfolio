import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { GetUsersService } from 'src/modules/users/endpoints/get.users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/users/entities/user.entity';
import { UserPayload } from './entities/user.payload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './entities/user.token';
import axios from 'axios';
import { GoogleProfile } from './entities/user.google.profile';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly getUsersService: GetUsersService,
    private readonly jwtService: JwtService,
  ) {}

  async generateJWTGoogle(profile: GoogleProfile) {
    const userExists = await this.getUsersService.findUserByEmail(
      profile.email,
    );

    if (!userExists) {
      throw new HttpException(
        {
          message: 'Usuario não cadastrado',
          status: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { accessToken } = this.login(userExists);
    return accessToken;
  }

  login(user: User): UserToken {
    const userPayload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      urlImageUser: user.urlImageUser,
    };

    const jwtToken = this.jwtService.sign(userPayload);

    return {
      accessToken: jwtToken,
    };
  }

  async validateUser(username: string, password: string) {
    const userExists = await this.getUsersService.findLoginUser(username);

    if (userExists) {
      const passwordValid = await bcrypt.compare(password, userExists.password);

      if (passwordValid) {
        return this.getUsersService.findOneUser(userExists.id);
      }
    }
    throw new HttpException(
      {
        message: 'Email ou senha incorretos',
        status: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }

  async getNewAccessToken(refreshToken: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://accounts.google.com/o/oauth2/token',
        {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_SECRET,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
        },
      );

      return response.data.access_token;
    } catch (error) {
      throw new Error('Failed to refresh the access token.');
    }
  }

  async getProfile(token: string) {
    try {
      return axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`,
      );
    } catch (error) {
      console.error('Failed to revoke the token:', error);
    }
  }

  async isTokenExpired(token: string): Promise<boolean> {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`,
      );

      const expiresIn = response.data.expires_in;

      if (!expiresIn || expiresIn <= 0) {
        return true;
      }
    } catch (error) {
      return true;
    }
  }

  async revokeGoogleToken(token: string) {
    try {
      await axios.get(
        `https://accounts.google.com/o/oauth2/revoke?token=${token}`,
      );
    } catch (error) {
      console.error('Failed to revoke the token:', error);
    }
  }
}
