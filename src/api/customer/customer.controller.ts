import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService } from 'src/application/customer/customer.service';
import { Customer } from 'src/domain/entities/customer.entity';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { GetCustomerByIdParams } from '../dtos/get-customer-by-id-params';

@Controller({
  version: '1',
  path: 'customers',
})
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
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

  @Get(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async getCustomerById(
    @Param() params: GetCustomerByIdParams,
  ): Promise<Customer> {
    return this.customerService.getCustomerById(params.id);
  }
}
