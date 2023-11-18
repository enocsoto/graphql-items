import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType( )
@Entity()
export class Item {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  // @Field(() => Float)
  // @Column()
  // quantity: number;

  @Field(() => String,  {nullable: true})
  @Column({nullable: true})
  quantityUnits?: string;


  //store
  //user
  @ManyToOne( () => User, (user) => user.items , {nullable: false , lazy: true})
  @Index('userId-index')
  @Field(() => User)
  user: User;
}
