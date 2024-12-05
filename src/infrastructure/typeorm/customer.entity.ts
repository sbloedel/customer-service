import { Entity, PrimaryColumn, Column, Index } from 'typeorm';

//TODO: At this time we only have an index on the phone number, but we may want to consider other indexes
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
  phoneNumber: string; //TODO: I opted to store this as a E.164 string for simplicity, but perhaps there are benefits to a composite phone number that should be considered
}
