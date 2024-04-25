import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class UserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  gender: string;

  @IsDateString()
  dob: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;
}
