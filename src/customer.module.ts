import { Module } from '@nestjs/common';
import { CustomerController } from './api/customer/customer.controller';
import { CustomerService } from './application/customer/customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './infrastructure/typeorm/customer.entity';
import { TypeOrmCustomerRepository } from './infrastructure/typeorm/customer.typeorm.repository';
import { WinstonLoggerService } from './core/logger/winston-logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    WinstonLoggerService,
    { provide: 'CustomerRepository', useClass: TypeOrmCustomerRepository },
  ],
})
export class CustomerModule {}
