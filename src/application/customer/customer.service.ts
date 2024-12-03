import { Inject, Injectable } from '@nestjs/common';
import { Customer } from 'src/domain/entities/customer.entity';
import { CustomerRepository } from 'src/domain/repositories/customer.repository';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,
  ) {}

  async createCustomer(
    firstName: string,
    middleName: string | undefined,
    lastName: string,
    emailAddress: string,
    phoneNumber: string,
  ): Promise<Customer> {
    const customer = new Customer(
      firstName,
      middleName,
      lastName,
      emailAddress,
      phoneNumber,
    );
    return this.customerRepository.save(customer);
  }
}
