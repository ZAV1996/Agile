import { InputType, Field, PickType } from '@nestjs/graphql';
import { UserInput } from '../../users/dto/user.input';

@InputType()
export class RegisterInput extends PickType(UserInput, ["name", "surname", "patronymic", "password", "email"]) {
}
