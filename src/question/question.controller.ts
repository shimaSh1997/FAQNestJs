import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { QuestionService } from "./question.service";
import { Question } from "./question.entity";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";

@Controller()
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Get("admin/questions")
  async adminFindAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  @Get("admin/questions/:id")
  async adminFindOne(@Param("id") id: number): Promise<Question> {
    const question = await this.questionService.findOne(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  @Post("admin/questions")
  @UsePipes(ValidationPipe)
  async adminCreate(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    return this.questionService.create(createQuestionDto);
  }

  @Put("admin/questions/:id")
  @UsePipes(ValidationPipe)
  async adminUpdate(
    @Param("id") id: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const updatedQuestion = await this.questionService.update(
      id,
      updateQuestionDto,
    );
    if (!updatedQuestion) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return updatedQuestion;
  }

  @Delete("admin/questions/:id")
  async adminRemove(@Param("id") id: number): Promise<void> {
    const question = await this.questionService.findOne(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return this.questionService.remove(id);
  }

  @Get("questions")
  async userFindAll(@Query("q") searchTerm?: string): Promise<Question[]> {
    if (searchTerm) {
      return this.questionService.search(searchTerm);
    }
    return this.questionService.findPublic();
  }

  @Get("questions/:id")
  async userFindOne(@Param("id") id: number): Promise<Question> {
    const question = await this.questionService.findPublicOne(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    // Increment view count
    question.viewCount += 1;
    await this.questionService.update(question.id, question);
    return question;
  }

  @Post("questions/:id/like")
  async like(@Param("id") id: number): Promise<Question> {
    const question = await this.questionService.findPublicOne(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    question.likes += 1;
    const updatedQuestion = await this.questionService.update(
      question.id,
      question,
    );
    if (!updatedQuestion) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return updatedQuestion;
  }

  @Post("questions/:id/dislike")
  async dislike(@Param("id") id: number): Promise<Question> {
    const question = await this.questionService.findPublicOne(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    question.dislikes += 1;
    const updatedQuestion = await this.questionService.update(
      question.id,
      question,
    );
    if (!updatedQuestion) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return updatedQuestion;
  }
}
