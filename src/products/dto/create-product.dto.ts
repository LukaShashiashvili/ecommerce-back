import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsString()
    category: string;

    @IsString()
    description: string;

    @IsString()
    image: string;

    @IsNumber()
    sale: number;
}
