import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from '../programs/entities/program.entity';
import { Probe } from './entities/probe.entity';
import { ProbesController } from './probes.controller';
import { ProbesService } from './probes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Probe, Program])],
  controllers: [ProbesController],
  providers: [ProbesService],
  exports: [ProbesService],
})
export class ProbesModule {}
