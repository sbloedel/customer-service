import { v4 as uuidv4 } from 'uuid';

export class Customer {
  readonly id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;

  constructor(
    firstName: string,
    middleName: string | undefined,
    lastName: string,
    emailAddress: string,
    phoneNumber: string,
    id: string = uuidv4(),
  ) {
    if (!firstName) throw new Error('First name is required.');
    if (!lastName) throw new Error('Last name is required.');
    if (!emailAddress) throw new Error('Email address is required.');

    this.id = id;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.emailAddress = emailAddress;
    this.phoneNumber = phoneNumber; //TODO: I opted to keep this as a E.164 string for simplicity, but perhaps there are benefits to a composite phone number that should be considered
  }
}
