import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsService } from './products/products.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [CategoriesModule, PrismaModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
