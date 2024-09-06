import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PathType } from "./types/path.type";
import { StatusPathService } from "./status-path.service";
import { PathInput } from "./inputs/path.input";

@Resolver(() => PathType)
export class StatusPathResolver {
    constructor(
        private pathService: StatusPathService
    ) { }

    @Query(() => [PathType])
    async getAllPath() {
        return await this.pathService.getAllPath()
    }

    @Mutation(() => PathType)
    async updatePath(@Args("pathInput") input: PathInput) {
        return await this.pathService.updatePath(input)
    }
}