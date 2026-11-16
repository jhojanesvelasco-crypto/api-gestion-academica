import { Controller, Get, Post, Body } from '@nestjs/common';
import { DocentesService } from './docentes.service';

@Controller('docentes')
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  @Get()
  findAll() {
    return this.docentesService.findAll();
  }

  @Post()
  create(@Body() data: any) {
    return this.docentesService.create(data);
  }
}