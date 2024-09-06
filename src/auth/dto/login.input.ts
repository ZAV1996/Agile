import { InputType, PickType } from '@nestjs/graphql';
import { UserInput } from 'src/users/dto/user.input';

@InputType()
export class LoginInput extends PickType(UserInput, ["email", "password"]) {
}