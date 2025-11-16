import {Controller,Get,Post,Body,Patch,Param,Delete,ParseIntPipe, UseInterceptors, UploadedFile} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import {CreateUserDto,UpdateUserDto,UserResponseDto,} from '../dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
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
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + file.originalname;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    if (avatar) {
      createUserDto.avatar = `/uploads/avatars/${avatar.filename}`;
    }
    
    return this.usersService.create(createUserDto);
  }
  
  @Post('login')
  async login(@Body() body: any) {
    const { email, password } = body;

    const user = await this.usersService.login(email, password);

    return { 
      message: "Login exitoso", 
      user 
    };
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
