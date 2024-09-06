import { Field, InputType, PickType } from "@nestjs/graphql";
import { IssueInput } from "./issue.input";
import { InputID } from "src/workflow/inputs/create.input";
import { InputUser } from "src/cond/inputs/user_cond.input";

@InputType()
export class CreateIssueInput extends PickType(IssueInput, ["Title", "IssueType", "Project", "Priority", "Author"]) {

    @Field(() => InputUser, { nullable: true })
    Assignee?: InputUser;

    @Field(() => InputID, { nullable: true })
    ParentIssue?: InputID;

    @Field(() => Date, { nullable: true })
    DueDate?: Date;

    @Field(() => [InputID], { nullable: true })
    Components?: [InputID];

    @Field(() => String, { nullable: true })
    Description?: string | undefined;
}