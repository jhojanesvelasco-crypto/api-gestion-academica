import { Controller, Get, Post, Body } from '@nestjs/common';
import { AsignaturasService } from './asignaturas.service';

@Controller('asignaturas')
export class AsignaturasController {
  constructor(private readonly asignaturasService: AsignaturasService) {}

  @Get()
  findAll() {
    return this.asignaturasService.findAll();
  }

  @Post()
  create(@Body() data: any) {
    return this.asignaturasService.create(data);
  }
}