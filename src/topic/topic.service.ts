import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Topic } from "./topic.entity";
import { CreateTopicDto } from "./dto/create-topic.dto";
import { UpdateTopicDto } from "./dto/update-topic.dto";

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
  ) {}

  async findAll(): Promise<Topic[]> {
    return this.topicRepository.find();
  }

  async findOne(id: number): Promise<Topic | null> {
    return this.topicRepository.findOne({ where: { id } });
  }

  async create(createTopicDto: CreateTopicDto): Promise<Topic> {
    const topic = this.topicRepository.create(createTopicDto);
    return this.topicRepository.save(topic);
  }

  async update(
    id: number,
    updateTopicDto: UpdateTopicDto,
  ): Promise<Topic | null> {
    await this.topicRepository.update(id, updateTopicDto);
    return this.topicRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.topicRepository.delete(id);
  }

  async findPublic(): Promise<Topic[]> {
    return this.topicRepository.find({ where: { status: "public" } });
  }

  async findPublicOne(id: number): Promise<Topic | null> {
    return this.topicRepository.findOne({ where: { id, status: "public" } });
  }
}
