import {
    IsNumber,
    IsArray,
    ArrayNotEmpty,
    IsString,
} from 'class-validator';

export class CreateCalificacionDto {
  @IsNumber()
  estrellas: number;

  @IsString()
  comoEnsenia: string;

  @IsString()
  comoCalifica: string;

  @IsString()
  cualidadEspecial: string;

  @IsNumber()
  userId: number;

  @IsNumber()
  profesorId: number;

  @IsNumber()
  materiaId: number;

  @IsString()
  facultad: string;
}

