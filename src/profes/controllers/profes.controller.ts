import { Controller, Get, Post, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ProfesService } from '../services/profes.service';
import { CreateProfesorDto } from '../dto/create-profes.dto';
import { Profesor } from '../entities/profes.entity';

@Controller('profes')
export class ProfesController {
  constructor(private readonly profesService: ProfesService) {}

  // Crear profesor
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateProfesorDto): Promise<Profesor> {
    return this.profesService.create(dto);
  }

  // Obtener todos o filtrar por query params opcionales: ?nombre=... & ?materia=...
  @Get()
  async findAll(
    @Query('nombre') nombre?: string,
    @Query('materia') materia?: string,
  ): Promise<Profesor[]> {
    if (nombre) return this.profesService.findByNombre(nombre);
    if (materia) return this.profesService.findByMateria(materia);
    return this.profesService.findAll();
  }
}