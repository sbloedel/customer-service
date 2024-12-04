import { IsEmail, IsOptional, IsString } from 'class-validator';
import { IsPhoneNumber } from './phone-number-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  emailAddress?: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;
}