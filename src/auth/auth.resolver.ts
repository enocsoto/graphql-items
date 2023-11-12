import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/inputs/singup.input';
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


//   @Mutation(()=> , {name: 'login'})
//   async login() : Promise<void> {
//     return await this.authService.login();
//   }

//   @Query({name: 'revalidate'})
// async  revalidateTOken(){
//     return await this.authService.revalidateToken();
//   }
}
