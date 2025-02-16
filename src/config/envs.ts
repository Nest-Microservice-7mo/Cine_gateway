import  'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
    PORT: number;
    MOVIE_MICROSERVICE_HOST: string;
    MOVIE_MICROSERVICE_PORT: number;
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    MOVIE_MICROSERVICE_HOST: joi.string().required(),
    MOVIE_MICROSERVICE_PORT: joi.number().required(),
})
.unknown(true);

const{error, value} = envsSchema.validate(process.env);

if(error) {
    throw new Error(`Error de Configuración: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    moviesMicroserviceHost: envVars.MOVIE_MICROSERVICE_HOST,
    moviesMicroservicePort: envVars.MOVIE_MICROSERVICE_PORT,
}