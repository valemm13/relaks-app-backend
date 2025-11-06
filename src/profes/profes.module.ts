import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesController } from './controllers/profes.controller';
import { ProfesService } from './services/profes.service';
import { Profesor } from './entities/profes.entity';
import { Materia } from '../materias/entities/materia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profesor, Materia])],
  controllers: [ProfesController],
  providers: [ProfesService],
  exports: [ProfesService],
})
export class ProfesModule {}
