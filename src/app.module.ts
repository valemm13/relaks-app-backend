import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { UserEntity } from './users/entities/users.entity';
import { ProfesModule } from './profes/profes.module';
//import { MateriasModule } from './materias/materias.module';
import { Profesor } from './profes/entities/profes.entity';
//import { Materia } from './materias/entities/materia.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [UserEntity, Profesor],
      synchronize: true, // ⚠️ solo en desarrollo
    }),
    UsersModule,
    ProfesModule,
    //MateriasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}