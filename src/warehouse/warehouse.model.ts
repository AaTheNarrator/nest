import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import { Product } from "../products/products.model";
import { Recipe } from "../recipes/recipes.model";
import {Manufacturer} from "../manufacturers/manufacturer.model";

interface WarehouseCreationAttrs{
    manufacturer_id:number;
    product_id:number;
    amount_product:number;
}

@Table({ tableName: 'warehouse', createdAt:false,updatedAt:false })
export class Warehouse extends Model<Warehouse,WarehouseCreationAttrs> {

    @ForeignKey(()=>Manufacturer)
    @Column({ type: DataType.INTEGER })
    manufacturer_id: number

    @ForeignKey(()=>Product)
    @Column({ type: DataType.INTEGER })
    product_id: number

    @Column({ type: DataType.INTEGER })
    amount_product: number
}
