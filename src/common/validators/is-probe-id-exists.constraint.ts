import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';
import { Probe } from '../../probes/entities/probe.entity';

@ValidatorConstraint({ name: 'IsProbeIdExists', async: true })
@Injectable()
export class IsProbeIdExistsConstraint implements ValidatorConstraintInterface {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async validate(probeId: string): Promise<boolean> {
    if (typeof probeId !== 'string' || probeId.length === 0) {
      return false;
    }
    const count = await this.dataSource.getRepository(Probe).count({
      where: { id: probeId },
    });
    return count > 0;
  }

  defaultMessage(): string {
    return 'probeId must reference an existing probe';
  }
}
