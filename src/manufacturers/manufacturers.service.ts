import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Manufacturer} from "./manufacturer.model";
import {CreateCompanyDto} from "./dto/create-company.dto";
import {RolesService} from "../roles/roles.service";

@Injectable()
export class ManufacturersService {

    constructor(@InjectModel(Manufacturer) private manufacturerRepository : typeof Manufacturer,
                private roleService : RolesService) {
    }

    async createManufacturer(dto : CreateCompanyDto) {
        const manufacturer = await this.manufacturerRepository.create(dto)
        const role = await this.roleService.getRoleByRoleName('MANUFACTURER')
        manufacturer.role_id = role.role_id
        await manufacturer.save()
        manufacturer.role = role
        return manufacturer
    }

    async searchManufacturerByLogin(login : string){
        return await this.manufacturerRepository.findOne(
            {
                where:{login},
                include:{all:true}
            })
    }

    async searchManufacturerById(id : number){
        return await this.manufacturerRepository.findByPk(id)
    }
}
