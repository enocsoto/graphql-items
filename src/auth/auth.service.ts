import { SignUpInput, LoginInput } from './dto/inputs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthResponse } from './types/auth-response.type';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

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

    async login (loginInput: LoginInput): Promise<AuthResponse> {
        const {email, password} = loginInput
        const user = await this.usersService.findOneByEmail(email);

        if(!bcrypt.compareSync(password, user.password)){
            throw new BadRequestException(`Email/password do not match`)
        }
        const token = 'ABC';

        return {
            token,
            user
        }
    }
}
