import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import { Product } from "../products/products.model";
import { Recipe } from "../recipes/recipes.model";
import {ApiProperty} from "@nestjs/swagger";

interface RoleCreationAttrs{
    role_name:string;
    role_description:string;
}

@Table({ tableName: 'roles', createdAt:false,updatedAt:false })
export class Role extends Model<Role,RoleCreationAttrs> {

    @ApiProperty({example:'1', description:'Уникальный идентификатор'})
    @Column({ type: DataType.INTEGER, primaryKey:true, unique:true,autoIncrement:true })
    role_id: number

    @ApiProperty({example:'CUSTOMER', description:'Роль'})
    @Column({ type: DataType.STRING })
    role_name: string

    @ApiProperty({example:'Обычный заказчик, глупый и ничего не умеет, кроме покупки товаров', description:'Описание роли'})
    @Column({ type: DataType.STRING })
    role_description: string
}
