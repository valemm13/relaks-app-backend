import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { Profesor } from '../entities/profes.entity';
import { CreateProfesorDto } from '../dto/create-profes.dto';
import { Materia } from '../../materias/entities/materia.entity';

@Injectable()
export class ProfesService {
  constructor(
    @InjectRepository(Profesor)
    private readonly profesorRepository: Repository<Profesor>,
    @InjectRepository(Materia)
    private readonly materiaRepository: Repository<Materia>,
  ) {}

  async create(dto: CreateProfesorDto): Promise<Profesor> {
    const profesor = this.profesorRepository.create({
      nombre: dto.nombre,
      facultad: dto.facultad,
    });

    if (dto.materiasIds && dto.materiasIds.length > 0) {
      const materias = await this.materiaRepository.findBy({
        id: In(dto.materiasIds),
      });
      profesor.materias = materias;
    }

    return this.profesorRepository.save(profesor);
  }

  async findAll(): Promise<Profesor[]> {
    return this.profesorRepository.find({ relations: ['materias'] });
  }

  // Búsqueda unificada: soporta nombre, materia o ambos
  async find(filters?: { nombre?: string; materia?: string }): Promise<Profesor[]> {
    const { nombre, materia } = filters || {};

    if (!nombre && !materia) return this.findAll();

    // Si solo hay nombre
    if (nombre && !materia) {
      return this.findByNombre(nombre);
    }

    // Si solo hay materia
    if (materia && !nombre) {
      return this.findByMateria(materia);
    }

    // Si hay ambos, usar query builder para filtrar por profesor.nombre y materia.nombre
    return this.profesorRepository
      .createQueryBuilder('profesor')
      .leftJoinAndSelect('profesor.materias', 'materia')
      .where('profesor.nombre LIKE :nombre', { nombre: `%${nombre}%` })
      .andWhere('materia.nombre LIKE :materia', { materia: `%${materia}%` })
      .getMany();
  }

  // Wrappers para compatibilidad con el controller existente
  async findByNombre(nombre: string): Promise<Profesor[]> {
    return this.profesorRepository.find({
      where: { nombre: Like(`%${nombre}%`) },
      relations: ['materias'],
    });
  }

  async findByMateria(materiaNombre: string): Promise<Profesor[]> {
    return this.profesorRepository
      .createQueryBuilder('profesor')
      .leftJoinAndSelect('profesor.materias', 'materia')
      .where('materia.nombre LIKE :nombre', { nombre: `%${materiaNombre}%` })
      .getMany();
  }
}