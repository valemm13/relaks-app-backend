import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
//import { Materia } from '../../materias/entities/materia.entity';

@Entity('profesores')
export class Profesor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  facultad?: string;

  /*@ManyToMany(() => Materia, (materia) => materia.profesores, { cascade: true })
  @JoinTable({
    name: 'profesor_materias',
    joinColumn: { name: 'profesor_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'materia_id', referencedColumnName: 'id' },
  })
  materias?: Materia[];*/
}