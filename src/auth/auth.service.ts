import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { first } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    const passwordMatches = await this.comparePasswords(pass, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async register(userDto: UserDto): Promise<any> {
    userDto.password = await this.hashPassword(userDto.password);
    const user = await this.usersService.create(userDto);
    const { password, ...result } = user;
    const payload = {
      sub: user.user_id,
      username: user.username,
      userDetails: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Adjust according to your requirements
    return bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
