import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from 'src/domain/entities/customer.entity';
import { CustomerRepository } from 'src/domain/repositories/customer.repository';
import { convertNumberToE164 } from 'src/api/dtos/phone-number-validator';
import { UpdateCustomerDto } from 'src/api/dtos/update-customer.dto';
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
      convertNumberToE164(phoneNumber),
    );
    return this.customerRepository.save(customer);
  }

  async getCustomerById(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async updateCustomer(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.getCustomerById(id);

    if (updateCustomerDto.firstName) {
      customer.firstName = updateCustomerDto.firstName;
    }
    if (updateCustomerDto.middleName) {
      customer.middleName = updateCustomerDto.middleName;
    }
    if (updateCustomerDto.lastName) {
      customer.lastName = updateCustomerDto.lastName;
    }
    if (updateCustomerDto.emailAddress) {
      customer.emailAddress = updateCustomerDto.emailAddress;
    }
    if (updateCustomerDto.phoneNumber) {
      customer.phoneNumber = convertNumberToE164(updateCustomerDto.phoneNumber);
    }

    return this.customerRepository.save(customer);
  }

  async deleteCustomer(id: string): Promise<void> {
    const customer = await this.getCustomerById(id);
    await this.customerRepository.remove(customer);
  }
}
