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
import { SectionService } from "./section.service";
import { Section } from "./section.entity";
import { CreateSectionDto } from "./dto/create-section.dto";
import { UpdateSectionDto } from "./dto/update-section.dto";

@Controller()
export class SectionController {
  constructor(private sectionService: SectionService) {}

  @Get("admin/sections")
  async adminFindAll(): Promise<Section[]> {
    return this.sectionService.findAll();
  }

  @Get("admin/sections/:id")
  async adminFindOne(@Param("id") id: number): Promise<Section> {
    const section = await this.sectionService.findOne(id);
    if (!section) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }
    return section;
  }

  @Post("admin/sections")
  @UsePipes(ValidationPipe)
  async adminCreate(
    @Body() createSectionDto: CreateSectionDto,
  ): Promise<Section> {
    return this.sectionService.create(createSectionDto);
  }

  @Put("admin/sections/:id")
  @UsePipes(ValidationPipe)
  async adminUpdate(
    @Param("id") id: number,
    @Body() updateSectionDto: UpdateSectionDto,
  ): Promise<Section> {
    const updatedSection = await this.sectionService.update(
      id,
      updateSectionDto,
    );
    if (!updatedSection) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }
    return updatedSection;
  }

  @Delete("admin/sections/:id")
  async adminRemove(@Param("id") id: number): Promise<void> {
    const section = await this.sectionService.findOne(id);
    if (!section) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }
    return this.sectionService.remove(id);
  }

  @Get("sections")
  async userFindAll(): Promise<Section[]> {
    return this.sectionService.findPublic();
  }

  @Get("sections/:id")
  async userFindOne(@Param("id") id: number): Promise<Section> {
    const section = await this.sectionService.findPublicOne(id);
    if (!section) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }
    return section;
  }
}
