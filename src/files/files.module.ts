import {forwardRef, Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import { FilesService } from './files.service';



@Module({
    controllers: [],
    providers: [FilesService],
    imports:[
    ],
    exports:[
        FilesService
    ]

})
export class ManufacturersModule {}