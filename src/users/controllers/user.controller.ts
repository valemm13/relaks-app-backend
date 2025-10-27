import {Controller,Get,Post,Body,Patch,Param,Delete,ParseIntPipe,} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import {CreateUserDto,UpdateUserDto,UserResponseDto,} from '../dto/create-user.dto';

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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<UserResponseDto> {
    return this.usersService.findOne(id).then((user) =>
      this.usersService['mapToResponseDto'](user),
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
