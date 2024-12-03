import { IsUUID } from 'class-validator';

export class GetCustomerByIdParams {
  @IsUUID()
  id: string;
}
