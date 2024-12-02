import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerController } from './api/customer/customer.controller';
import { CustomerModule } from './customer.module';

@Module({
  imports: [CustomerModule],
  controllers: [AppController, CustomerController],
  providers: [AppService],
})
export class AppModule {}
