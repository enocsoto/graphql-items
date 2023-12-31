import { Resolver, Query, Mutation, Args, Int, ID, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ValidrRolesArgs } from './dto/args/roles.arg';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ValidRoles } from '../auth/enums/valid-roles.enums';
import { UpdateUserInput } from './dto/update-user.input';
import { ItemsService } from 'src/items/items.service';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly itemsService: ItemsService
    ) {}

  @Query(() => [User], { name: 'users' })
  findAll(
    @Args() validRoles: ValidrRolesArgs,
    @CurrentUser([ValidRoles.admin]) user: User,
  ): Promise<User[]> {
    return this.usersService.findAll(validRoles.roles);
  }

  @Query(() => User, { name: 'user' })
  findOne(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser([ValidRoles.admin], ParseUUIDPipe) user: User,
  ): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => User, {name: 'updateUser'})
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser([ValidRoles.admin], ParseUUIDPipe) user: User,
    ): Promise<User>  {
    return await this.usersService.update(updateUserInput.id, updateUserInput, user);
  }

  @Mutation(() => User, { name: 'blockUser' })
  blockUser(
    @Args('id', { type: () => Int }) id: string,
    @CurrentUser([ValidRoles.admin], ParseUUIDPipe) user: User,
    
    ): Promise<User> {
    return this.usersService.block(id, user);
  }

  @ResolveField(() => Int, {name: 'itemCount', description:'Number of items'})
  async itemCount(
  @Parent() user: User,
  @CurrentUser([ValidRoles.admin], ParseUUIDPipe) adminUser: User, 
  //el decorador aplica las reglas de validacion de rol no es necesario pasarlo al servicio

  ): Promise<number> {
    return this.itemsService.itemCountByUser(user)
  }
}
