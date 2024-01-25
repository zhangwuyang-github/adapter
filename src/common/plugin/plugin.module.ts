import { Global, Module } from '@nestjs/common';
import { MesService } from '../service/mes.service';
import { CodeSearchService } from './code-search/code-search.service';
import { OpenApiService } from '../service/open.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/configuration';

@Global()
@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  providers: [MesService, OpenApiService, CodeSearchService],
  exports: [CodeSearchService],
})
export class PluginModule {}
