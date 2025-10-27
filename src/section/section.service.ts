import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Section } from "./section.entity";
import { CreateSectionDto } from "./dto/create-section.dto";
import { UpdateSectionDto } from "./dto/update-section.dto";

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
  ) {}

  async findAll(): Promise<Section[]> {
    return this.sectionRepository.find();
  }

  async findOne(id: number): Promise<Section | null> {
    return this.sectionRepository.findOne({ where: { id } });
  }

  async create(createSectionDto: CreateSectionDto): Promise<Section> {
    const section = this.sectionRepository.create(createSectionDto);
    return this.sectionRepository.save(section);
  }

  async update(
    id: number,
    updateSectionDto: UpdateSectionDto,
  ): Promise<Section | null> {
    await this.sectionRepository.update(id, updateSectionDto);
    return this.sectionRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.sectionRepository.delete(id);
  }

  async findPublic(): Promise<Section[]> {
    return this.sectionRepository.find({ where: { status: "public" } });
  }

  async findPublicOne(id: number): Promise<Section | null> {
    return this.sectionRepository.findOne({ where: { id, status: "public" } });
  }
}
