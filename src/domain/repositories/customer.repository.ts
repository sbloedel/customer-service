import { Customer } from '../entities/customer.entity';

export interface CustomerRepository {
  save(customer: Customer): Promise<Customer>;
}
