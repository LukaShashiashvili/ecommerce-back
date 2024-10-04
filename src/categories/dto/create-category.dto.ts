import { IsArray, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsUrl()
    image: string;
}
