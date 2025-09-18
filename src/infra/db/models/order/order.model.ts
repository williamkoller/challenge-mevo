import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class OrderModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb' })
  buyer: { name: string; cpf: string };

  @Column({ type: 'text', array: true })
  items: [{ name: string; quantity: number; price: number }];

  @Column()
  status: 'pendente' | 'na entrega' | 'faturado' | 'entregue' | 'cancelado';

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
