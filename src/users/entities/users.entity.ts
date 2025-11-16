import {Entity,PrimaryGeneratedColumn,Column,OneToOne,OneToMany,CreateDateColumn,UpdateDateColumn,} from 'typeorm';
import { Calificacion } from 'src/calificaciones/entities/calificaciones.entity';

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


  //Hacer Relaciones

  @OneToMany(() => Calificacion, (calificacion) => calificacion.user, {
    cascade: true,
  })
  calificacion: Calificacion[]; 

}
