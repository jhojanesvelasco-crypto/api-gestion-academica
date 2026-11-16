import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class DocentesService {
  constructor(private databaseService: DatabaseService) {}

  async findAll() {
    const [rows] = await this.databaseService
      .getPool()
      .query('SELECT * FROM docentes');

    return rows;
  }

  async create(data: any) {
    if (!data.nombre || !data.apellido || !data.correo) {
      throw new BadRequestException(
        'Todos los campos son obligatorios: nombre, apellido y correo',
      );
    }

    const [result] = await this.databaseService
      .getPool()
      .execute(
        'INSERT INTO docentes (nombre, apellido, correo) VALUES (?, ?, ?)',
        [data.nombre, data.apellido, data.correo],
      );

    return result;
  }
}