import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike } from "typeorm";
import { Question } from "./question.entity";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async findAll(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  async findOne(id: number): Promise<Question | null> {
    return this.questionRepository.findOne({ where: { id } });
  }

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = this.questionRepository.create(createQuestionDto);
    return this.questionRepository.save(question);
  }

  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question | null> {
    await this.questionRepository.update(id, updateQuestionDto);
    return this.questionRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.questionRepository.delete(id);
  }

  async findPublic(): Promise<Question[]> {
    return this.questionRepository.find({ where: { status: "public" } });
  }

  async findPublicOne(id: number): Promise<Question | null> {
    return this.questionRepository.findOne({ where: { id, status: "public" } });
  }

  async search(term: string): Promise<Question[]> {
    return this.questionRepository
      .createQueryBuilder("question")
      .where("question.question LIKE :term", { term: `%${term}%` })
      .andWhere("question.status = :status", { status: "public" })
      .getMany();
  }

  async incrementViewCount(id: number): Promise<void> {
    await this.questionRepository.increment({ id }, "viewCount", 1);
  }

  async questionExists(question: string): Promise<boolean> {
    try {
      const existing = await this.questionRepository.findOne({
        where: { question: ILike(question.trim()) },
      });
      return !!existing;
    } catch (error) {
      console.error('questionExists error:', error);
      // If there's a database error, we'll assume the question doesn't exist
      // This prevents blocking the user when there are technical issues
      return false;
    }
  }
}
