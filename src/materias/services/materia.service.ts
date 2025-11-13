import {Injectable,NotFoundException,ConflictException,BadRequestException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Materia } from '../entities/materia.entity';
import {CreateMateriaDto,UpdateMateriaDto,SearchMateriaDto,MateriaResponseDto,} from '../dto/create-materia.dto';

@Injectable()
export class MateriaService {
  constructor(
    @InjectRepository(Materia)
    private readonly materiaRepository: Repository<Materia>,
  ) {}

  // Convierte una entidad a DTO de respuesta
  private mapToResponseDto(materia: Materia): MateriaResponseDto {
    return {
      id: materia.id,
      nombre: materia.nombre,
      creditos: materia.creditos,
      descripcion: materia.descripcion
    };
  }

  // Crear materia
  async create(createMateriaDto: CreateMateriaDto): Promise<MateriaResponseDto> {
    const existingMateria = await this.materiaRepository.findOne({
      where: { id: createMateriaDto.id },
    });
    if (existingMateria) {
      throw new ConflictException('La materia ya está registrada');
    }
    const newMateria = this.materiaRepository.create(createMateriaDto);
    const savedMateria = await this.materiaRepository.save(newMateria);
    return this.mapToResponseDto(savedMateria);

  }

  // Obtener todos los usuarios
  async findAll(): Promise<MateriaResponseDto[]> {
    console.log('Obteniendo materias desde la base de datos');
    const materias = await this.materiaRepository.find({
      order: { id: 'ASC' },
    });
    return materias.map((materia) => this.mapToResponseDto(materia));
  }

  // Obtener un materia por ID
  async findOne(id: string): Promise<Materia> {
    const materia = await this.materiaRepository.findOne({
      where: { id },
      relations: ['calificaciones']
    });

    if (!materia) {
      throw new NotFoundException(`Materia con ID ${id} no encontrado`);
    }

    return materia;
  }

  // Buscar usuarios con filtros
  async search(searchMateriaDto: SearchMateriaDto): Promise<MateriaResponseDto[]> {
    console.log('Buscando materias con filtros:', searchMateriaDto);

    const whereConditions: Record<string, any> = {};

    if (searchMateriaDto.id) {
      whereConditions.id = Like(`%${searchMateriaDto.id}%`);
    }

    if (searchMateriaDto.nombre) {
      whereConditions.nombre = Like(`%${searchMateriaDto.nombre}%`);
    }

    const materias = await this.materiaRepository.find({
      where: whereConditions,
      order: { id: 'ASC' },
    });

    return materias.map((materia) => this.mapToResponseDto(materia));
  }

  // Actualizar usuario
  async update(id: string, updateMateriaDto: UpdateMateriaDto): Promise<MateriaResponseDto> {
    const materia = await this.findOne(id);

    Object.assign(materia, updateMateriaDto);
    const updatedMateria = await this.materiaRepository.save(materia);

    return this.mapToResponseDto(updatedMateria);
  }

  // Eliminar usuario
  async remove(id: string): Promise<void> {
    const materia = await this.findOne(id);
    await this.materiaRepository.remove(materia);
  }
}
