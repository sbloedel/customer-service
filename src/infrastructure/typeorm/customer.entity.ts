import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('customers')
export class CustomerEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  emailAddress: string;

  @Column()
  phoneNumber: string;
}
