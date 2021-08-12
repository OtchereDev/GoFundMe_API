import { EntityRepository, Repository } from 'typeorm'
import { Story } from './story.entity';

@EntityRepository(Story)
export class StoryRepository extends Repository<Story>{
    
}