import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './infrastructure/typeorm/customer.entity';
import { WinstonLoggerService } from './core/logger/winston-logger.service';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

//TODO: Need to use @nestjs/config configuration management service to load the configuration settings from env variables
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'pass123',
      database: process.env.DB_NAME || 'postgres',
      entities: [CustomerEntity],
      synchronize: true,
    }),
    CustomerModule,
    PrometheusModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService, WinstonLoggerService],
  exports: [WinstonLoggerService],
})
export class AppModule {}
