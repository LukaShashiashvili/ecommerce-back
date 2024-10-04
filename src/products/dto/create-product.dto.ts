import { IsArray, IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsArray()
    categoryIds: number[];

    @IsString()
    description: string;

    @IsUrl()
    image: string;

    @IsNumber()
    sale: number;
}
