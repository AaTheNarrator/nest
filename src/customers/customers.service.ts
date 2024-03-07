import { Injectable } from '@nestjs/common';
import {CreateCompanyDto} from "../manufacturers/dto/create-company.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Customer} from "./customer.model";
import {RolesService} from "../roles/roles.service";
import { FindOptions } from 'sequelize';
import { Role } from 'src/roles/role.model';

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
        customer.role = role
        return customer
    }

    async searchCustomerByLogin(login : string){
        return await this.customerRepository.findOne({
            where: { login },
            include: [Role] // Включаем связанную модель Role
        });
    }
}
