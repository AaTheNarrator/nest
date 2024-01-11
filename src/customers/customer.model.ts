import {BelongsTo, BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Recipe} from "../recipes/recipe.model";
import {Cart} from "../cart/cart.model";
import {Order} from "../orders/order.model";
import {Role} from "../roles/role.model";

interface CustomerCreationAttrs{
    company_name:string;
    inn:string;
    login:string;
    password:string;
}

@Table({tableName:'customers'})
export class Customer extends Model<Customer,CustomerCreationAttrs>{

    @ApiProperty({example:'1', description:'Уникальный идентификатор'})
    @Column({type:DataType.INTEGER, autoIncrement:true, unique:true, primaryKey:true})
    customer_id : number

    @ApiProperty({example:'ООО "Люди хотят квас"', description:'Название компании'})
    @Column({type:DataType.STRING})
    company_name : string

    @ApiProperty({example:'934589743', description:'ИНН компании'})
    @Column({type:DataType.STRING})
    inn : string

    @ApiProperty({example:'PeopleWontAKvas', description:'Логин производителя'})
    @Column({type:DataType.STRING, unique: true})
    login : string

    @ApiProperty({example:'password123', description:'Пароль производителя'})
    @Column({type:DataType.STRING})
    password : string

    @ApiProperty({example:'2', description:'Идентификатор роли'})
    @Column({type:DataType.INTEGER})
    role_id : number

    @BelongsTo(()=>Role,'role_id')
    role : Role

    @BelongsToMany(()=>Recipe, ()=>Cart)
    recipesFromCart : Recipe[]

    @BelongsToMany(()=>Recipe, ()=>Order)
    recipesFromOrder : Recipe[]
}