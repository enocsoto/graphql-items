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
      if (!isUUID(id)) throw new Error(`Invalid id: ${id}`);
      const newItem = await this.itemsRepository.findOneBy({ id });
      if (!newItem)
        throw new NotFoundException(`Item whit id: ${id} not found`);
      return newItem;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to find item`);
    }
  }

  update(id: number, updateItemInput: UpdateItemInput) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
