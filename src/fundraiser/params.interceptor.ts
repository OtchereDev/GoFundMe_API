import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { isUUID} from 'class-validator'
import { Fundraiser } from './entity/fundraiser.entity';


@Injectable()
export class ParamInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    
    const req=context.switchToHttp().getRequest()

    const checkParam =isUUID(req.params.id)

    if (!checkParam) throw new BadRequestException('Validation failed (uuid  is expected)')

    const raiserObj = await Fundraiser.findOne(req.params.id)
        
    if (!raiserObj) throw new BadRequestException('No Fundraiser found with this ID')
    
    return next
      .handle()
    

  }
}