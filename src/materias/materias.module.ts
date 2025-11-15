import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materia } from './entities/materia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Materia])],
  exports: [TypeOrmModule], // ← Exporta para que otros módulos puedan usarlo
})
export class MateriasModule {}