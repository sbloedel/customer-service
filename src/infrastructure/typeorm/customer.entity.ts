import { Entity, PrimaryColumn, Column, Index } from 'typeorm';

@Entity('customers')
@Index('IDX_PHONE_NUMBER', ['phoneNumber'])
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
