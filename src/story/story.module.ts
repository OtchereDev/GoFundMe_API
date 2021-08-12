import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './entity/story.entity';
import { StoryRepository } from './entity/story.repo';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Story,StoryRepository
    ])
  ],
  controllers: [StoryController],
  providers: [StoryService]
})
export class StoryModule {}
