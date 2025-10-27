import { IsNotEmpty, IsString, IsEnum, IsOptional } from "class-validator";

export class CreateSectionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(["draft", "public"])
  status?: "draft" | "public";
}
