import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerService } from '../../application/customer/customer.service';
import { Customer } from '../..//domain/entities/customer.entity';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { GetCustomerByIdParams } from '../dtos/get-customer-by-id-params';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';
import { WinstonLoggerService } from 'src/core/logger/winston-logger.service';

@Controller({
  version: '1',
  path: 'customers',
})
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly logger: WinstonLoggerService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const { firstName, middleName, lastName, emailAddress, phoneNumber } =
      createCustomerDto;
    this.logger.debug('createCustomer endpoint called');
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
    this.logger.debug('getCustomerById endpoint called');
    return this.customerService.getCustomerById(params.id);
  }

  //TODO: At this time, we can lookup a customer by phone number, but we may want to consider other ways to lookup a customer (ie Last Name, Email Address, etc)
  @Get()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async getCustomerByPhoneNumber(
    @Query('phoneNumber') phoneNumber: string,
  ): Promise<Customer[]> {
    this.logger.debug('getCustomerByPhoneNumber endpoint called');
    return this.customerService.getCustomerByPhoneNumber(phoneNumber);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateCustomer(
    @Param() params: GetCustomerByIdParams,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    this.logger.debug('updateCustomer endpoint called');
    return this.customerService.updateCustomer(params.id, updateCustomerDto);
  }

  @Delete(':id')
  async deleteCustomer(@Param() params: GetCustomerByIdParams): Promise<void> {
    this.logger.debug('deleteCustomer endpoint called');
    return this.customerService.deleteCustomer(params.id);
  }
}
