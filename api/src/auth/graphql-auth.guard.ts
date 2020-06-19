/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class GraphqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    
    return ctx.getContext().req
  }
}