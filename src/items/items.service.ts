import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemInput, UpdateItemInput } from './dto';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}
  async create(createItemInput: CreateItemInput, user: User): Promise<Item> {
    const newItems = this.itemsRepository.create({ ...createItemInput, user });
    return await this.itemsRepository.save(newItems);
  }

  async findAll(user: User): Promise<Item[]> {
    return await this.itemsRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async findOne(id: string, user: User): Promise<Item> {
    try {
      const newItem = await this.itemsRepository.findOneBy({
        id,
        user: { id: user.id },
      });
      if (!newItem)
        throw new NotFoundException(`Item whit id: ${id} not found`);
      return newItem;
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updateItemInput: UpdateItemInput,
    user: User,
  ): Promise<Item> {
    try {
      await this.findOne(id, user);
      const item = await this.itemsRepository.preload(updateItemInput);
      if (!item)
        throw new NotFoundException(`Item whit id: ${id} not found`);
      return await this.itemsRepository.save(item);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string, user: User): Promise<Item> {
    try {
      const item = await this.findOne(id, user);
      if (!item) throw new NotFoundException(`Item not found: ${id}`);
      await this.itemsRepository.remove(item);
      return { ...item, id };
    } catch (error) {
      throw error;
    }
  }

  async itemCountByUser (user: User) : Promise<number> {
    return await this.itemsRepository.count({
      where: { user: { id: user.id } },
    });
  }
}
