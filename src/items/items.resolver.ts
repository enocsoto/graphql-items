import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemInput, UpdateItemInput } from './dto';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
  ): Promise<Item> {
    return this.itemsService.create(createItemInput);
  }

  @Query(() => [Item], { 
    name: 'Find All items',
    description: 'Find all items' 
  })
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Query(() => Item, {
    name: 'Find One item',
    description: 'Find One Item by ID using UUID',
  })
  async findOne(
    @Args('id', { type: () => String }, ParseUUIDPipe) id: string
    ): Promise<Item> {
    return await this.itemsService.findOne(id);
  }

  @Mutation(() => Item, {
    name: 'Update Item',
    description: 'Update Item by ID using UUID',
  })
  async updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemInput
    ) : Promise<Item> {
    return await this.itemsService.update(updateItemInput.id, updateItemInput);
  }

  @Mutation(() => Item, {
    name: 'Remove Item',
    description: 'Remove Item by ID using UUID',
  })
  async removeItem(
    @Args('id', { type: () => ID, }, ParseUUIDPipe) id: string
    ) : Promise<Item> {
    return await this.itemsService.remove(id);
  }
}
