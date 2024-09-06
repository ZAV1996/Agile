import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Session {

  
  @PrimaryColumn({ nullable: false })
  uuid: string;

  @Column({ nullable: false, length: 500 })
  accessToken: string;

  @Column({ nullable: false, length: 500 })
  refreshToken: string
}
