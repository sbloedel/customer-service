import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../../domain/entities/customer.entity';
import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { CustomerEntity } from './customer.entity';

@Injectable()
export class TypeOrmCustomerRepository implements CustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly repository: Repository<CustomerEntity>,
  ) {}

  async save(customer: Customer): Promise<Customer> {
    const customerEntity = this.repository.create(customer);
    const result = await this.repository.save(customerEntity);
    return new Customer(
      result.firstName,
      result.middleName,
      result.lastName,
      result.emailAddress,
      result.phoneNumber,
      result.id,
    );
  }

  async findById(id: string): Promise<Customer | undefined> {
    const result = await this.repository.findOne({
      where: { id },
    });
    if (!result) {
      return undefined;
    }
    return new Customer(
      result.firstName,
      result.middleName,
      result.lastName,
      result.emailAddress,
      result.phoneNumber,
      result.id,
    );
  }
}
