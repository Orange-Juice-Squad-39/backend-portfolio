import { Controller, Post, UseGuards, Request, Get, Res, UnauthorizedException, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './entities/auth.request';
import { IsPublic } from './decorators/is-public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CheckTokenExpiryGuard } from './CheckTokenExpiryGuard';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @IsPublic()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @Get('google')
  @IsPublic()
  @UseGuards(AuthGuard('google'))
  googleLogin() { }

  @Get('google/callback')
  @IsPublic()
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Request() req, @Res() res: Response) {
    const googleToken = req.user.accessToken;
    const googleRefreshToken = req.user.refreshToken;
    const profile = (await this.authService.getProfile(googleToken)).data
    console.log(JSON.stringify(profile))
    const token = await this.authService.generateJWTGoogle(profile)
    res.redirect(`http://localhost:3000/${token}`);
  }
}

