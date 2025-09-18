import { Module } from '@nestjs/common';
import { DbModule } from './infra/db/db.module';
import { OrderModule } from './presentation/modules/order/order.module';

@Module({
  imports: [DbModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
