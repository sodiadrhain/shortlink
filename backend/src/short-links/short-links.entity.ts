import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { IShortLink } from './short-links.interface';

@Entity()
export class ShortLinks extends BaseEntity implements IShortLink {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'full_link' })
  fullLink: string;

  @Column({ name: 'short_link_code' })
  shortLinkCode: string;

  @Column({ default: 0 })
  stats: number;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(0)',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(0)',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;
}
