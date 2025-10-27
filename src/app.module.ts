import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { UserEntity } from './users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // o 'mysql' | 'postgres'
      database: 'database.sqlite', // o tus credenciales
      entities: [UserEntity],
      synchronize: true, // ⚠️ solo en desarrollo
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
