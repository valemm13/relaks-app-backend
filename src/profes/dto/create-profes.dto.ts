// ...existing code...
import { IsString, IsOptional, IsArray, ArrayNotEmpty, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProfesorDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  facultad?: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  @IsInt({ each: true })
  materiasIds?: number[];
}