import {BelongsTo, BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Recipe} from "../recipes/recipe.model";
import {Product} from "../products/products.model";
import {Warehouse} from "../warehouse/warehouse.model";
import {Role} from "../roles/role.model";


interface ManufacturerCreationAttrs{
    company_name:string;
    inn:string;
    login:string;
    password:string;
}

@Table({tableName:'manufacturers'})
export class Manufacturer extends Model<Manufacturer,ManufacturerCreationAttrs>{

    @ApiProperty({example:'1', description:'Уникальный идентификатор'})
    @Column({type:DataType.INTEGER, autoIncrement:true, unique:true, primaryKey:true})
    manufacturer_id : number

    @ApiProperty({example:'ООО "Люди любят квас"', description:'Название компании'})
    @Column({type:DataType.STRING})
    company_name : string

    @ApiProperty({example:'934589743', description:'ИНН компании'})
    @Column({type:DataType.STRING})
    inn : string

    @ApiProperty({example:'PeopleLoveAKvas', description:'Логин производителя'})
    @Column({type:DataType.STRING, unique:true})
    login : string

    @ApiProperty({example:'password123', description:'Пароль производителя'})
    @Column({type:DataType.STRING})
    password : string

    @ApiProperty({example:'2', description:'Идентификатор роли'})
    @Column({type:DataType.INTEGER})
    role_id : number

    @BelongsTo(()=>Role,'role_id')
    role : Role

    @HasMany(()=>Recipe,'recipe_id')
    recipes : Recipe[]

    @BelongsToMany(()=>Product,()=>Warehouse)
    products:Product[]
}