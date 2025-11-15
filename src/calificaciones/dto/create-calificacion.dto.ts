import {
    IsNumber,
    IsArray,
    ArrayNotEmpty,
    IsString,
} from 'class-validator';

export class CreateCalificacionDto {
    @IsNumber()
    estrellas: number;

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    comoEnsenia: string[];

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    comoCalifica: string[];

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    cualidadEspecial: string[];

    @IsNumber()
    userId: number;

    @IsNumber()
    profesorId: number;

    @IsNumber()
    materiaId: number;
}
