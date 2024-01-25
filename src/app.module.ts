import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './service/app.service';
import { CpsService } from './common/service/cps.service';
import { ErpService } from './common/service/erp.service';
import { OpenApiService } from './common/service/open.service';
import { MesService } from './common/service/mes.service';
import configuration from './configuration';
import { PluginModule } from './common/plugin/plugin.module';

@Module({
  imports: [
    PluginModule,
    CacheModule.register(),
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
    ConfigService,
  ],
})
export class AppModule {}
