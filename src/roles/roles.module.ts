import { Module, forwardRef } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./role.model";
import {ManufacturersModule} from "../manufacturers/manufacturers.module";
import { Manufacturer } from 'src/manufacturers/manufacturer.model';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports:[
    SequelizeModule.forFeature([Role, Manufacturer]),
    forwardRef (()=>ManufacturersModule),
  ],
  exports:[
      RolesService
  ]
})
export class RolesModule {}
