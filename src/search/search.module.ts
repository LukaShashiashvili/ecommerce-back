import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ProductsModule } from 'src/products/products.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports:[ProductsModule, CategoriesModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
