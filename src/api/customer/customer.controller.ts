import { Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from 'src/application/customer/customer.service';
import { Customer } from 'src/domain/entities/customer.entity';
import { CreateCustomerDto } from '../dtos/create-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const { firstName, middleName, lastName, emailAddress, phoneNumber } =
      createCustomerDto;
    return this.customerService.createCustomer(
      firstName,
      middleName,
      lastName,
      emailAddress,
      phoneNumber,
    );
  }

  @Get()
  async getCustomers() {
    return 'Hello World';
  }
}
