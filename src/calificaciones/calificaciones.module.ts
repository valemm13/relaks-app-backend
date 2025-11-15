import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calificacion } from './entities/calificaciones.entity';
import { CalificacionesService } from './services/calificaciones.service';
import { CalificacionesController } from './controllers/calificaciones.controller';
import { UserEntity } from 'src/users/entities/users.entity';
import { Profesor } from 'src/profes/entities/profes.entity';
import { Materia } from 'src/materias/entities/materia.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Calificacion, UserEntity, Profesor, Materia])],
  controllers: [CalificacionesController],
  providers: [CalificacionesService],
  exports: [CalificacionesService],
})
export class CalificacionesModule {}
