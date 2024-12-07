import { Type } from "class-transformer";
import { IsNumber, IsString, IsUrl, Max, Min } from "class-validator";

export class CreatePeliculaDto {
    @IsString()
    public name: string;

    @IsNumber()
    @Min(1700)
    @Max(2024)
    @Type(() => Number)
    public year: number;

    @IsString()
    public type: string;

    @IsString()
    @IsUrl()
    public image_url: string;
}
