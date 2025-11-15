import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { UserEntity } from 'src/users/entities/users.entity';
import { Profesor } from 'src/profes/entities/profes.entity';
import { Materia } from 'src/materias/entities/materia.entity';

@Entity('Calificaciones')
export class Calificacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    estrellas: number;

    @Column("simple-array")
    comoEnsenia: string[];

    @Column("simple-array")
    comoCalifica: string[];

    @Column("simple-array")
    cualidadEspecial: string[];

    @ManyToOne(() => UserEntity, users => users.calificaciones, { eager: true })
    user: UserEntity;

    @ManyToOne(() => Profesor, profesores => profesores.calificaciones, { eager: true, cascade: true })
    profesor: Profesor;

    @ManyToOne(() => Materia, materia => materia.calificaciones, { eager: true })
    materia: Materia;

    @CreateDateColumn()
    fecha: Date;
}
