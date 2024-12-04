import { IsNotEmpty, IsEmail, IsOptional, IsString } from 'class-validator';
import { IsPhoneNumber } from './phone-number-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  emailAddress: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
}
