import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/configuration';
import { MesService } from './mes/mes.service';
import { OpenApiService } from './open-api/open-api.service';
import { ErpService } from './erp/erp.service';
import { CorepassService } from './corepass/corepass.service';
import { CodeSearchService } from './code-search/code-search.service';

@Global()
@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  providers: [
    CodeSearchService,
    MesService,
    OpenApiService,
    ErpService,
    CorepassService,
  ],
  exports: [
    CodeSearchService,
    MesService,
    OpenApiService,
    ErpService,
    CorepassService,
  ],
})
export class PluginModule {}
