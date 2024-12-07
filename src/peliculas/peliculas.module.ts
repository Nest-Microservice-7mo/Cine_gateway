import { Module } from '@nestjs/common';
import { PeliculasController } from './peliculas.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, MOVIE_MICROSERVICE } from 'src/config';

@Module({
  controllers: [PeliculasController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: MOVIE_MICROSERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.moviesMicroserviceHost,
          port: envs.moviesMicroservicePort
        }
      }
    ]),
  ]
})

export class PeliculasModule {}
