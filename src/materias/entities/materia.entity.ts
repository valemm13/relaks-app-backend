import {Entity,PrimaryColumn,Column,OneToOne,OneToMany,CreateDateColumn,UpdateDateColumn, IntegerType,} from 'typeorm';
import { Calificacion } from 'src/calificaciones/entities/calificaciones.entity';

@Entity('materias')
export class Materia {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'int'})
  creditos: number;

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

  /*Hacer Relaciones

  @ManyToMany() profesores
  @OneToMany() calificaciones




  @ManyToMany(() => Profesores, (profes) => profile.user, { cascade: true })
  profile: Profile;

  @OneToMany(() => WeeklyRoutine, (weeklyRoutine) => weeklyRoutine.user, {
    cascade: true,
  })
  weeklyRoutines: WeeklyRoutine[]; */

}
