import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Mission } from './missions/entities/mission.entity';
import { MissionsModule } from './missions/missions.module';
import { Probe } from './probes/entities/probe.entity';
import { ProbesModule } from './probes/probes.module';
import { Program } from './programs/entities/program.entity';
import { ProgramsModule } from './programs/programs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'program_probe_mission.sqlite',
      entities: [Program, Probe, Mission],
      synchronize: true,
    }),
    AuthModule,
    ProgramsModule,
    ProbesModule,
    MissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
