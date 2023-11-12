import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput, LoginInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(()=> AuthResponse, {name: 'signup'})
  async signup(
    @Args('singUpInput') signUpInput: SignUpInput
    ) : Promise<AuthResponse> {
    return await this.authService.signUp(signUpInput);
  }


  @Mutation(()=> AuthResponse, {name: 'login'})
  async login(
    @Args('loginInput') loginInput: LoginInput
    ) : Promise<AuthResponse> {
    return await this.authService.login(loginInput);
    }
//   @Query({name: 'revalidate'})
// async  revalidateTOken(){
//     return await this.authService.revalidateToken();
//   }
}
