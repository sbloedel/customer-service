import { validate } from 'class-validator';
import { IsPhoneNumber, convertNumberToE164 } from './phone-number-validator';

class TestPhoneNumberDto {
  @IsPhoneNumber()
  phoneNumber: string;
}

describe('PhoneNumberValidator', () => {
  describe('IsPhoneNumber', () => {
    it('should validate a valid phone number', async () => {
      const dto = new TestPhoneNumberDto();
      dto.phoneNumber = '+14155552671'; // Valid US phone number in E.164 format

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should invalidate an invalid phone number', async () => {
      const dto = new TestPhoneNumberDto();
      dto.phoneNumber = '12345'; // Invalid phone number

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should invalidate a phone number with invalid format', async () => {
      const dto = new TestPhoneNumberDto();
      dto.phoneNumber = 'invalid-phone-number'; // Invalid phone number format

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('convertNumberToE164', () => {
    it('should convert a valid phone number to E.164 format', () => {
      const phoneNumber = '(415) 555-2671'; // Valid US phone number in local format
      const e164Number = convertNumberToE164(phoneNumber);
      expect(e164Number).toBe('+14155552671');
    });

    it('should throw an error for an invalid phone number', () => {
      const phoneNumber = '12345'; // Invalid phone number
      expect(() => convertNumberToE164(phoneNumber)).toThrow();
    });
  });
});
