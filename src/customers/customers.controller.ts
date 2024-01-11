import {Body, Controller, Post} from '@nestjs/common';
import {CustomersService} from "./customers.service";
import {CreateCompanyDto} from "../manufacturers/dto/create-company.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Manufacturer} from "../manufacturers/manufacturer.model";
import {Customer} from "./customer.model";

@ApiTags('Заказчики')
@Controller('customers')
export class CustomersController {

    constructor(private customersService: CustomersService) {
    }

    @ApiOperation({summary:'Создание заказчика'})
    @ApiResponse({status:200, type:Customer})
    @Post()
    createCustomer(@Body() dto : CreateCompanyDto){
        return this.customersService.createCustomer(dto)
    }
}
