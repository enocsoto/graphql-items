import { SignUpInput } from './dto/inputs/singup.input';
import { Injectable } from '@nestjs/common';
import { AuthResponse } from './types/auth-response.type';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService :UsersService
    ){}

    async signUp (signUpInput: SignUpInput): Promise<AuthResponse> {
        const user = await this.usersService.create(signUpInput);

        const token = 'ABC';

        return {
            token,
            user
        }
    }
}
