import { Injectable } from '@nestjs/common';
import { StoryRepository } from './entity/story.repo';

@Injectable()
export class StoryService {
    constructor(private storyRepo:StoryRepository){}
}
