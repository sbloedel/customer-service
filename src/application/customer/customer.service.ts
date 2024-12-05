import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Customer } from '../../domain/entities/customer.entity';
import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { convertNumberToE164 } from '../../api/dtos/phone-number-validator';
import { UpdateCustomerDto } from '../../api/dtos/update-customer.dto';
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
      convertNumberToE164(phoneNumber), //TODO: Consider moving this to the domain object instead
    );
    try {
      return await this.customerRepository.save(customer);
    } catch (error) {
      //TODO: This leaks the specific database error to the service. Consider refactoring
      if (error.code === '23505') {
        throw new ConflictException(
          `Customer with email address already exists`,
        );
      }
      //TODO: Need to send this information to monitoring service like Sentry
      throw error;
    }
  }

  async getCustomerById(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new NotFoundException(`Customer not found`);
    }
    return customer;
  }

  async getCustomerByPhoneNumber(phoneNumber: string): Promise<Customer[]> {
    const customers = await this.customerRepository.findByPhoneNumber(
      convertNumberToE164(phoneNumber),
    );
    return customers;
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
      customer.phoneNumber = convertNumberToE164(updateCustomerDto.phoneNumber); //TODO: Consider moving this to the domain object instead
    }

    try {
      return await this.customerRepository.save(customer);
    } catch (error) {
      //TODO: This leaks the specific database error to the service. Consider refactoring
      if (error.code === '23505') {
        throw new ConflictException(
          `Customer with email address already exists`,
        );
      }
      //TODO: Need to send this information to monitoring service like Sentry
      throw error;
    }
  }

  async deleteCustomer(id: string): Promise<void> {
    const customer = await this.getCustomerById(id);
    await this.customerRepository.remove(customer);
  }
}
