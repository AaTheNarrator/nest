import {forwardRef, Module} from '@nestjs/common';
import { ManufacturersController } from './manufacturers.controller';
import { ManufacturersService } from './manufacturers.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Manufacturer} from "./manufacturer.model";
import {Recipe} from "../recipes/recipe.model";
import {Role} from "../roles/role.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";


@Module({
    controllers: [ManufacturersController],
    providers: [ManufacturersService],
    imports:[
        SequelizeModule.forFeature([Manufacturer,Recipe,Role]),
        
        forwardRef(()=> AuthModule),
        RolesModule
    ],
    exports:[
        ManufacturersService
    ]

})
export class ManufacturersModule {}
