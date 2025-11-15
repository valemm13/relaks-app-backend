import {Entity,PrimaryGeneratedColumn,Column,OneToOne,OneToMany,CreateDateColumn,UpdateDateColumn,} from 'typeorm';
import { Calificacion } from 'src/calificaciones/entities/calificaciones.entity';

//import { WeeklyRoutine } from '../../routines/entities/weekly-routine.entities';
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatar?: string;
  constructor(partial: Partial<UserEntity> = {}) {
    Object.assign(this, partial);
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Calificacion, cal => cal.user)
  calificaciones: Calificacion[];


  /*Hacer Relaciones
  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile: Profile;

  @OneToMany(() => WeeklyRoutine, (weeklyRoutine) => weeklyRoutine.user, {
    cascade: true,
  })
  weeklyRoutines: WeeklyRoutine[]; */

}
