import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { CpsService } from './common/service/cps.service';
import { ErpService } from './common/service/erp.service';
import { OpenApiService } from './common/service/open.service';
import { MesService } from './common/service/mes.service';
import { EasyEasyService } from './common/service/easy.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    CpsService,
    ErpService,
    OpenApiService,
    MesService,
    EasyEasyService,
    ConfigService,
  ],
})
export class AppModule {}
