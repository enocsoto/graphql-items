import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemInput, UpdateItemInput } from './dto';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}
  async create(createItemInput: CreateItemInput): Promise<Item> {
    const newItems = this.itemsRepository.create(createItemInput);
    return await this.itemsRepository.save(newItems);
  }

  async findAll(): Promise<Item[]> {
    return await this.itemsRepository.find();
  }

  async findOne(id: string): Promise<Item> {
    try {
      const newItem = await this.itemsRepository.findOneBy({ id });
      if (!newItem)
        throw new NotFoundException(`Item whit id: ${id} not found`);
      return newItem;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    try {
      await this.findOne(id);
      const newItem = await this.itemsRepository.preload(updateItemInput);
      if (!newItem)
        throw new NotFoundException(`Item whit id: ${id} not found`);
      return await this.itemsRepository.save(newItem);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const item = await this.findOne(id);
      if (!item) throw new NotFoundException(`Item not found: ${id}`);
      await this.itemsRepository.remove(item);
      return {...item, id};
    } catch (error) {
      throw error;
    }
  }
}
