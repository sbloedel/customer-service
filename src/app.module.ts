import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './infrastructure/typeorm/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', //TODO: Use env variable
      port: 5432, //TODO: Use env variable
      username: 'postgres', //TODO: Use env variable
      password: 'pass123', //TODO: Use env variable or secrets manager
      database: 'postgres', //TODO: Use env variable
      entities: [CustomerEntity],
      synchronize: true,
    }),
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
