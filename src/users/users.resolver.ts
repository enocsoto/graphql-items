import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ValidrRolesArgs } from './dto/args/roles.arg';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ValidRoles } from '../auth/enums/valid-roles.enums';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll(
    @Args() validRoles: ValidrRolesArgs,
    @CurrentUser([ValidRoles.admin]) user: User
  ) : Promise<User[]> {
  return this.usersService.findAll( validRoles.roles);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string) : Promise<User> {
    throw new Error ('not implemented');
    // return this.usersService.findOneByEmail(id);
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  @Mutation(() => User)
  blockUser(@Args('id', { type: () => Int }) id: string): Promise<User> {
    return this.usersService.block(id);
  }
}
