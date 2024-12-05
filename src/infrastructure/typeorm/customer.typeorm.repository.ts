import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../../domain/entities/customer.entity';
import { CustomerRepository } from '../../domain/repositories/customer.repository';
import { CustomerEntity } from './customer.entity';
import { WinstonLoggerService } from '../../core/logger/winston-logger.service';

@Injectable()
export class TypeOrmCustomerRepository implements CustomerRepository {
  constructor(
    private readonly logger: WinstonLoggerService,
    @InjectRepository(CustomerEntity)
    private readonly repository: Repository<CustomerEntity>,
  ) {}

  async save(customer: Customer): Promise<Customer> {
    try {
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
    } catch (error) {
      this.logger.error('Database error saving customer', error);
      throw error;
    }
  }

  async findById(id: string): Promise<Customer | undefined> {
    try {
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
    } catch (error) {
      this.logger.error('Database error finding customer by id', error);
      throw error;
    }
  }

  async findByPhoneNumber(phoneNumber: string): Promise<Customer[]> {
    try {
      const result = await this.repository.find({
        where: { phoneNumber },
      });

      return result.map(
        (item) =>
          new Customer(
            item.firstName,
            item.middleName,
            item.lastName,
            item.emailAddress,
            item.phoneNumber,
            item.id,
          ),
      );
    } catch (error) {
      this.logger.error('Database error finding customers by query', error);
      throw error;
    }
  }

  async remove(customer: Customer): Promise<void> {
    try {
      await this.repository.delete(customer.id);
    } catch (error) {
      this.logger.error('Database error deleting customer', error);
      throw error;
    }
  }
}
