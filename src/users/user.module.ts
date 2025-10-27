import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/users.entity';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/user.controller';

/**
 * Módulo de Usuarios
 *
 * Maneja toda la funcionalidad relacionada con usuarios:
 * - CRUD de usuarios
 * - Gestión de perfiles
 * - Relaciones con rutinas
 */
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
