import { Injectable } from '@nestjs/common';
import {CreateCompanyDto} from "../manufacturers/dto/create-company.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Customer} from "./customer.model";
import {RolesService} from "../roles/roles.service";

@Injectable()
export class CustomersService {

    constructor(@InjectModel(Customer) private customerRepository : typeof Customer,
                private roleService : RolesService) {
    }


    async createCustomer(dto: CreateCompanyDto) {
        const customer = await this.customerRepository.create(dto)
        const role = await this.roleService.getRoleByRoleName('CUSTOMER')
        customer.role_id = role.role_id
        await customer.save()
        return customer
    }

    async getCustomerByLogin(login : string){
        return await this.customerRepository.findOne(
            {
                where:{login},
                include:{all:true}
            })
    }
}
