import { Customer } from './customer.entity';
import * as uuid from 'uuid';

jest.mock('uuid');

describe('Customer Entity', () => {
  beforeEach(() => {
    (uuid.v4 as jest.Mock).mockReturnValue('fixed-uuid');
  });

  it('should create a customer with valid data', () => {
    const firstName = 'John';
    const middleName = 'Doe';
    const lastName = 'Smith';
    const emailAddress = 'john.doe@example.com';
    const phoneNumber = '1234567890';

    const customer = new Customer(
      firstName,
      middleName,
      lastName,
      emailAddress,
      phoneNumber,
    );

    expect(customer.id).toBe('fixed-uuid');
    expect(customer.firstName).toBe(firstName);
    expect(customer.middleName).toBe(middleName);
    expect(customer.lastName).toBe(lastName);
    expect(customer.emailAddress).toBe(emailAddress);
    expect(customer.phoneNumber).toBe(phoneNumber);
  });

  it('should throw an error if first name is missing', () => {
    expect(() => {
      new Customer('', 'Doe', 'Smith', 'john.doe@example.com', '1234567890');
    }).toThrow('First name is required.');
  });

  it('should throw an error if last name is missing', () => {
    expect(() => {
      new Customer('John', 'Doe', '', 'john.doe@example.com', '1234567890');
    }).toThrow('Last name is required.');
  });

  it('should throw an error if email address is missing', () => {
    expect(() => {
      new Customer('John', 'Doe', 'Smith', '', '1234567890');
    }).toThrow('Email address is required.');
  });

  it('should allow creating a customer without a middle name', () => {
    const firstName = 'John';
    const lastName = 'Smith';
    const emailAddress = 'john.doe@example.com';
    const phoneNumber = '1234567890';

    const customer = new Customer(
      firstName,
      undefined,
      lastName,
      emailAddress,
      phoneNumber,
    );

    expect(customer.id).toBe('fixed-uuid');
    expect(customer.firstName).toBe(firstName);
    expect(customer.middleName).toBeUndefined();
    expect(customer.lastName).toBe(lastName);
    expect(customer.emailAddress).toBe(emailAddress);
    expect(customer.phoneNumber).toBe(phoneNumber);
  });
});
