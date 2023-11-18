import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SEED_ITEMS, SEED_USERS } from './data/seed=data';
import { UsersService } from 'src/users/users.service';
import { ItemsService } from 'src/items/items.service';

@Injectable()
export class SeedService {
  private isProd: boolean;

  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,

    private readonly userService: UsersService,
    private readonly itemService: ItemsService,
  ) {
    this.isProd = this.configService.get('STATE') === 'prod';
  }

  async executeSeed(): Promise<void> {
    if (this.isProd)
      throw new UnauthorizedException(`We Cannot execute seed on Prod`);

    await this.deleteDatabases();
    const user = await this.loadUsers();
  }

  async deleteDatabases(): Promise<void> {
    await this.itemRepository.createQueryBuilder().delete().where({}).execute();

    await this.usersRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
  }

  async loadUsers(): Promise<User> {
    const user = [];
    for (const users of SEED_USERS) 
        user.push(this.userService.create(users));
    await Promise.all(user);
    return user[0];
  }

  async loadItems(user: User): Promise<void> {
    const itemPromises = [];
    for (const item of SEED_ITEMS)
      itemPromises.push(this.itemService.create(item, user));
    await Promise.all(itemPromises);
  }
}
