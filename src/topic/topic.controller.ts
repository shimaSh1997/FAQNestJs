import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { TopicService } from "./topic.service";
import { Topic } from "./topic.entity";
import { CreateTopicDto } from "./dto/create-topic.dto";
import { UpdateTopicDto } from "./dto/update-topic.dto";

@Controller()
export class TopicController {
  constructor(private topicService: TopicService) {}

  @Get("admin/topics")
  async adminFindAll(): Promise<Topic[]> {
    return this.topicService.findAll();
  }

  @Get("admin/topics/:id")
  async adminFindOne(@Param("id") id: number): Promise<Topic> {
    const topic = await this.topicService.findOne(id);
    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
    return topic;
  }

  @Post("admin/topics")
  @UsePipes(ValidationPipe)
  async adminCreate(@Body() createTopicDto: CreateTopicDto): Promise<Topic> {
    return this.topicService.create(createTopicDto);
  }

  @Put("admin/topics/:id")
  @UsePipes(ValidationPipe)
  async adminUpdate(
    @Param("id") id: number,
    @Body() updateTopicDto: UpdateTopicDto,
  ): Promise<Topic> {
    const updatedTopic = await this.topicService.update(id, updateTopicDto);
    if (!updatedTopic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
    return updatedTopic;
  }

  @Delete("admin/topics/:id")
  async adminRemove(@Param("id") id: number): Promise<void> {
    const topic = await this.topicService.findOne(id);
    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
    return this.topicService.remove(id);
  }

  @Get("topics")
  async userFindAll(): Promise<Topic[]> {
    return this.topicService.findPublic();
  }

  @Get("topics/:id")
  async userFindOne(@Param("id") id: number): Promise<Topic> {
    const topic = await this.topicService.findPublicOne(id);
    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
    return topic;
  }
}
