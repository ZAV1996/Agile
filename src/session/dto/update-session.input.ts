import { CreateSessionInput } from './create-session.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSessionInput extends CreateSessionInput {
  @Field(() => String)
  uuid: number;
}
