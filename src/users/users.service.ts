import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { SignUpInput } from '../auth/dto/inputs/singup.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  private logger = new Logger('UserService');
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ){}
 async create(signUpInput: SignUpInput) : Promise<User> {
   
    try {
      const newUser = this.usersRepository.create({
        ...signUpInput,
      password: bcrypt.hashSync(signUpInput.password, 8)
    });
      return await this.usersRepository.save(newUser);
      
    } catch (error) {
      this.handleDBErrors(error);
    } 
  }

  async findAll() : Promise<User[]> {
    return [];
  }

  findOne(id: string) : Promise<User> {
    throw new Error(`FindOne not implemented`);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  block(id: string) : Promise<User> {
    throw new Error(`Block Method not implemented`);
  }

  private handleDBErrors(errors: any): never{
    this.logger.error(errors);
    if(errors.code === '23505'){
      throw new BadRequestException(`email already exists`,  errors.detail.replace('Key', ''));
    }
    throw new InternalServerErrorException('Please check server logs');
  }
}
