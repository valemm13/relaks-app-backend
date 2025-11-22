import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { CalificacionesService } from '../services/calificaciones.service';
import { CreateCalificacionDto } from '../dto/create-calificacion.dto';

/**
 * Controlador de Calificaciones
 *
 * Maneja todas las rutas HTTP relacionadas con calificaciones:
 * - POST /calificaciones -> Crear una calificación
 * - GET /calificaciones -> Obtener todas las calificaciones
 * - GET /calificaciones/:id -> Obtener una calificación por ID
 * - PATCH /calificaciones/:id -> Actualizar una calificación
 * - DELETE /calificaciones/:id -> Eliminar una calificación
 */

@Controller('calificaciones')
export class CalificacionesController {
    constructor(private readonly calificacionesService: CalificacionesService) {}

    @Post()
    create(@Body() dto: CreateCalificacionDto) {
        return this.calificacionesService.create(dto);
    }

    @Get()
    findAll() {
        return this.calificacionesService.findAll();
    }

    @Get('profesor/:id')
    findByProfesor(@Param('id') id: number) {
        return this.calificacionesService.findByProfesor(id);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.calificacionesService.findOne(id);
    }

    @Get('has-rated')
    hasRated(
    @Query('studentId') studentId: number,
    @Query('profesorId') profesorId: number
    ) {
    return this.calificacionesService.hasRated(studentId, profesorId);
    }

}
