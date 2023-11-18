import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemInput, UpdateItemInput } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver(() => Item)
@UseGuards(JwtAuthGuard)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item, {
    name: 'CreateItem',
    description: 'Create a new item',
  })
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
    @CurrentUser() user: User,
  ): Promise<Item> {
    return this.itemsService.create(createItemInput, user);
  }

  @Query(() => [Item], {
    name: 'FindAllitems',
    description: 'Find all items',
  })
  async findAll(
    @CurrentUser() user: User,
  ): Promise<Item[]> {
    return await this.itemsService.findAll(user);
  }

  @Query(() => Item, {
    name: 'FindOneItem',
    description: 'Find One Item by ID using UUID',
  })
  async findOne(
    @Args('id', { type: () => String }, ParseUUIDPipe,) id: string,
    @CurrentUser() user: User,
  ): Promise<Item> {
    return await this.itemsService.findOne(id, user);
  }

  @Mutation(() => Item, {
    name: 'UpdateItem',
    description: 'Update Item by ID using UUID',
  })
  async updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
    @CurrentUser() user: User,
  ): Promise<Item> {
    return await this.itemsService.update(updateItemInput.id, updateItemInput, user);
  }

  @Mutation(() => Item, {
    name: 'RemoveItem',
    description: 'Remove Item by ID using UUID',
  })
  async removeItem(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ): Promise<Item> {
    return await this.itemsService.remove(id, user);
  }
}
