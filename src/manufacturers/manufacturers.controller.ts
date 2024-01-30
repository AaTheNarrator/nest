import {Body, Controller, Post} from '@nestjs/common';
import {CreateCompanyDto} from "./dto/create-company.dto";
import {ManufacturersService} from "./manufacturers.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Manufacturer} from "./manufacturer.model";

@ApiTags('Производители')
@Controller('manufacturers')
export class ManufacturersController {

    constructor(private manufacturersService : ManufacturersService) {
    }

    // @ApiOperation({summary:'Создание производителя'})
    // @ApiResponse({status:200, type:Manufacturer})
    // @Post()
    // createManufacturer(@Body() manufacturerDto : CreateCompanyDto){
    //     return this.manufacturersService.createManufacturer(manufacturerDto)
    // }

}
