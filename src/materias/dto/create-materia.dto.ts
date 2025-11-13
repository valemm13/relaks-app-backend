import { IsString, IsEnum, IsEmail, IsNotEmpty, IsOptional, IsUrl, MinLength, IsNumber } from 'class-validator';

export class CreateMateriaDto {

  @IsString({ message: 'El id debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El id es obligatorio' })
  id: string;

  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string; 

  @IsNumber({}, { message: 'Los créditos deben ser un numero' })
  @IsNotEmpty({ message: 'El número de créditos es obligatorio' })
  creditos: number;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  descripcion: string;

  @IsNumber({}, { message: 'La calificación deben ser un numero' })
  @IsNotEmpty({ message: 'El calificación de créditos es obligatorio' })
  calificacionTotal: number;

}
export class UpdateMateriaDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre: string; 

  @IsNumber({}, { message: 'Los créditos deben ser un numero' })
  @IsNotEmpty({ message: 'El número de créditos es obligatorio' })
  creditos: number;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  descripcion: string;

  @IsNumber({}, { message: 'La calificación deben ser un numero' })
  @IsNotEmpty({ message: 'El calificación de créditos es obligatorio' })
  calificacionTotal: number;
}

export class SearchMateriaDto {
  @IsOptional()
  @IsString({ message: 'El id debe ser una cadena de texto' })
  id: string;

  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  nombre: string;
}

export class MateriaResponseDto {
  id: string;
  nombre: string;  
  creditos: number;
  descripcion?: string;
}
