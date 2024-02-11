import {BelongsTo, BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Manufacturer} from "../manufacturers/manufacturer.model";
import {Recipe} from "../recipes/recipes.model";
import {RecipesProducts} from "../recipes_products/recipes_products.model";
import {Warehouse} from "../warehouse/warehouse.model";

interface ProductCreationAttrs{
    product_name : string
    unit_price : number
}

@Table({tableName:'products'})
export class Product extends Model<Product,ProductCreationAttrs>{

    @Column({type:DataType.INTEGER, autoIncrement:true, unique:true, primaryKey:true})
    product_id : number

    @Column({type:DataType.STRING})
    product_name : string

    @Column({type:DataType.FLOAT})
    unit_price : number

    @BelongsToMany(()=>Recipe, ()=>RecipesProducts)
    recipes:Recipe[]

    @BelongsToMany(()=>Manufacturer,()=>Warehouse)
    manufactures : Manufacturer[]
}