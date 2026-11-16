import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AsignaturasService {
  constructor(private databaseService: DatabaseService) {}

  async findAll() {
    const [rows] = await this.databaseService
      .getPool()
      .query('SELECT * FROM asignaturas');

    return rows;
  }

  async create(data: any) {
    if (!data.nombre) {
      throw new BadRequestException(
        'El nombre de la asignatura es obligatorio',
      );
    }

    try {
      const [result] = await this.databaseService
        .getPool()
        .execute(
          'INSERT INTO asignaturas (nombre, descripcion, id_docente) VALUES (?, ?, ?)',
          [data.nombre, data.descripcion || null, data.id_docente || null],
        );

      return result;
    } catch (error: any) {
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new BadRequestException(
          'El docente indicado no existe',
        );
      }

      throw error;
    }
  }
}