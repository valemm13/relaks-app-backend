import { Entity, PrimaryGeneratedColumn, Column, OneToMany,ManyToMany, JoinTable } from 'typeorm';
import { Calificacion } from 'src/calificaciones/entities/calificaciones.entity';
import { Materia } from '../../materias/entities/materia.entity';

@Entity('profesores')
export class Profesor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  facultad?: string;

  @OneToMany(() => Calificacion, (calificacion) => calificacion.profesor)
  calificaciones: Calificacion[];

  @ManyToMany(() => Materia, (materia) => materia.profes, { cascade: true })
  @JoinTable({
    name: 'profesor_materias',
    joinColumn: { name: 'profesor_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'materia_id', referencedColumnName: 'id' },
  })
  materias?: Materia[];
}