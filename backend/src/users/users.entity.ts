import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { IUser } from './users.interface';

@Entity()
export class Users extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({
    name: 'api_key',
    unique: true,
    type: 'uuid',
  })
  apiKey: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(0)',
    name: 'created_at',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(0)',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;
}
