import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calificacion } from '../entities/calificaciones.entity';
import { CreateCalificacionDto } from '../dto/create-calificacion.dto';
import { UserEntity } from 'src/users/entities/users.entity';
import { Profesor } from 'src/profes/entities/profes.entity';
import { Materia } from 'src/materias/entities/materia.entity';


/**
 * Servicio de Calificaciones
 *
 * Encargado de la lógica de negocio para gestionar calificaciones:
 * - Crear nuevas calificaciones
 * - Obtener todas las calificaciones
 * - Obtener una calificación por ID
 * - Actualizar una calificación existente
 * - Eliminar una calificación
 *
 * Este servicio interactúa con la base de datos mediante TypeORM
 * para realizar todas las operaciones CRUD.
 */

@Injectable()
export class CalificacionesService {
    constructor(
        @InjectRepository(Calificacion)
        private readonly calificacionRepo: Repository<Calificacion>,

        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,

        @InjectRepository(Profesor)
        private readonly profRepo: Repository<Profesor>,

        @InjectRepository(Materia)
        private readonly materiaRepo: Repository<Materia>,
    ) {}

    async create(dto: CreateCalificacionDto) {
        const user = await this.userRepo.findOne({ where: { id: dto.userId } });
        if (!user) throw new NotFoundException('Usuario no encontrado');

        const profesor = await this.profRepo.findOne({ where: { id: dto.profesorId } });
        if (!profesor) throw new NotFoundException('Profesor no encontrado');

        const materia = await this.materiaRepo.findOne({ where: { id: dto.materiaId } as any});
        if (!materia) throw new NotFoundException('Materia no encontrada');

        const nueva = this.calificacionRepo.create({
            estrellas: dto.estrellas,
            comoEnsenia: dto.comoEnsenia,
            comoCalifica: dto.comoCalifica,
            cualidadEspecial: dto.cualidadEspecial,
            user,
            profesor,
            materia,
        });

        return this.calificacionRepo.save(nueva);
    }

    async findAll() {
        return this.calificacionRepo.find();
    }

    async findByProfesor(profesorId: number) {
        return this.calificacionRepo.find({
            where: { profesor: { id: profesorId } },
        });
    }

    async findOne(id: number) {
        const calificacion = await this.calificacionRepo.findOne({ where: { id } });
        if (!calificacion) throw new NotFoundException('Calificación no encontrada');
        return calificacion;
    }
}
