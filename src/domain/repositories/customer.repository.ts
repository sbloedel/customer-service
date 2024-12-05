import { Customer } from '../entities/customer.entity';

export interface CustomerRepository {
  save(customer: Customer): Promise<Customer>;
  findById(id: string): Promise<Customer>;
  findByPhoneNumber(phoneNumber: string): Promise<Customer[]>;
  remove(customer: Customer): Promise<void>;
}
