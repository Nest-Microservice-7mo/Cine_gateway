import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { MOVIE_MICROSERVICE } from 'src/config';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { firstValueFrom } from 'rxjs';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto';

@Controller('peliculas')
export class PeliculasController {
  constructor(@Inject(MOVIE_MICROSERVICE) private readonly moviesClient: ClientProxy) {}

    @Post()
    createMovie(@Body() createPeliculaDto: CreatePeliculaDto) {
      return this.moviesClient.send(
        {cmd: 'create_movie'},
        createPeliculaDto
      );
  }

  @Get()
  findAllMovies(@Query() paginationDto: PaginationDto) {
    return this.moviesClient.send(
      {cmd: 'find_all_movies'},
      paginationDto
    );
  }

  @Get(':id')
  async findOne(@Param('id') id:number) {
    try {
      const movie = await firstValueFrom(
        this.moviesClient.send(
          {cmd: 'find_one_movie'}, 
          {id}
        )
      );
      return movie;
    } catch(error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async patchMovie(@Param('id', ParseIntPipe) id:number, @Body() updatePeliculaDto: UpdatePeliculaDto) {
    try {
      const movie = await firstValueFrom(
        this.moviesClient.send(
          {cmd: 'update_movie'},
          {...updatePeliculaDto, id}
        )
      );
      return movie;
    } catch(error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id:number) {
    try {
      const movie = await firstValueFrom(
       this.moviesClient.send(
        {cmd: 'delete_movie'},
        {id}
       )
      );
      return movie;
    } catch(error) {
      throw new RpcException(error);
    }  
  }
}
