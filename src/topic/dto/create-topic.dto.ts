import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
} from "class-validator";

export class CreateTopicDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(["draft", "public"])
  status?: "draft" | "public";

  @IsOptional()
  @IsNumber()
  sectionId?: number;
}
