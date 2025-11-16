import {Injectable,NotFoundException,ConflictException,BadRequestException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { UserEntity } from '../entities/users.entity';
import {CreateUserDto,UpdateUserDto,SearchUserDto,UserResponseDto,} from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // Convierte una entidad a DTO de respuesta
  private mapToResponseDto(user: UserEntity): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    };
  }

  // Crear usuario
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }
    const newUser = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(newUser);
    return this.mapToResponseDto(savedUser);

  }

  // Obtener todos los usuarios
  async findAll(): Promise<UserResponseDto[]> {
    console.log('Obteniendo usuarios desde la base de datos');
    const users = await this.userRepository.find({
      order: { id: 'ASC' },
    });
    return users.map((user) => this.mapToResponseDto(user));
  }

  // Obtener un usuario por ID
  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id } 
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }

  // Buscar usuarios con filtros
  async search(searchUserDto: SearchUserDto): Promise<UserResponseDto[]> {
    console.log('Buscando usuarios con filtros:', searchUserDto);

    const whereConditions: Record<string, any> = {};

    if (searchUserDto.name) {
      whereConditions.name = Like(`%${searchUserDto.name}%`);
    }

    if (searchUserDto.email) {
      whereConditions.email = Like(`%${searchUserDto.email}%`);
    }

    const users = await this.userRepository.find({
      where: whereConditions,
      order: { id: 'ASC' },
    });

    return users.map((user) => this.mapToResponseDto(user));
  }

  // Actualizar usuario
  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.findOne(id);

    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);

    return this.mapToResponseDto(updatedUser);
  }

  // Eliminar usuario
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  // Iniciar sesion
  async login(email: string, password: string) {
  const user = await this.userRepository.findOne({ where: { email } });

  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  if (user.password !== password) {
    throw new Error("Contraseña incorrecta");
  }

  return user;
}

}
