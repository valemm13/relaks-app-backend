import {Controller,Get,Post,Body,Patch,Param,Delete,ParseIntPipe,} from '@nestjs/common';
import { MateriaService } from '../services/materia.service';
import {CreateMateriaDto,UpdateMateriaDto,MateriaResponseDto,} from '../dto/create-materia.dto';

/**
 * Controlador de Usuarios
 *
 * Maneja todas las rutas HTTP relacionadas con usuarios:
 * - POST /users - Crear usuario
 * - GET /users - Obtener lista de usuarios
 * - GET /users/:id - Obtener usuario por id
 * - PATCH /users/:id - Actualizar usuario
 * - DELETE /users/:id - Eliminar usuario
 */

@Controller('materias')
export class MateriasController {
  constructor(private readonly materiasService: MateriaService) {}

  @Post()
  create(@Body() createMateriaDto: CreateMateriaDto): Promise<MateriaResponseDto> {
    return this.materiasService.create(createMateriaDto);
  }

  @Get()
  findAll(): Promise<MateriaResponseDto[]> {
    return this.materiasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string): Promise<MateriaResponseDto> {
    return this.materiasService.findOne(id).then((materia) =>
      this.materiasService['mapToResponseDto'](materia),
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateMateriaDto: UpdateMateriaDto,
  ): Promise<MateriaResponseDto> {
    return this.materiasService.update(id, updateMateriaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string): Promise<void> {
    return this.materiasService.remove(id);
  }
}
