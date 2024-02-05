import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: 'http://localhost:4444/google/callback',
            scope: ['email', 'profile'],
        });
    }

    // make sure to add this or else you won't get the refresh token
    authorizationParams(): { [key: string]: string } {
        return {
            access_type: 'offline',
            prompt: 'consent',
        };
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any,
    ) {
        const { name, emails, photos } = profile;

        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken,
            refreshToken,
        };

        done(null, user);
    }
}