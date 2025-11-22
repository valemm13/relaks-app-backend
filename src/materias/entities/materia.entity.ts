import {Entity,PrimaryColumn,Column,OneToMany, ManyToMany,CreateDateColumn,UpdateDateColumn, IntegerType,} from 'typeorm';
import { Calificacion } from 'src/calificaciones/entities/calificaciones.entity';
import { Profesor } from 'src/profes/entities/profes.entity';
@Entity('materias')
export class Materia {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'int'})
  creditos: number;

  @Column()
  facultad: string;

  @Column({ type: 'varchar', length: 255 })
  descripcion?: string;

  @Column({ type: 'float'})
  calificacionTotal: number;

  @OneToMany(() => Calificacion, (calificacion) => calificacion.materia)
  calificaciones: Calificacion[];
  
  constructor(materia: Materia) {
    Object.assign(this, materia);
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Profesor, (profes) => profes.materias)
  profes: Profesor[];


}
