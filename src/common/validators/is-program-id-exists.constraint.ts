import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';
import { Program } from '../../programs/entities/program.entity';

@ValidatorConstraint({ name: 'IsProgramIdExists', async: true })
@Injectable()
export class IsProgramIdExistsConstraint implements ValidatorConstraintInterface {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async validate(programId: string): Promise<boolean> {
    if (typeof programId !== 'string' || programId.length === 0) {
      return false;
    }
    const count = await this.dataSource.getRepository(Program).count({
      where: { id: programId },
    });
    return count > 0;
  }

  defaultMessage(): string {
    return 'programId must reference an existing program';
  }
}
