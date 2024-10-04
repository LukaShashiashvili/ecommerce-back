import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsArray()
    products: string[];

    @IsString()
    image: string;
}
