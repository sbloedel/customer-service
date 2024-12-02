import { Controller, Get } from '@nestjs/common';

@Controller('customers')
export class CustomerController {
  @Get()
  async getCustomers() {
    return 'Hello World';
  }
}
