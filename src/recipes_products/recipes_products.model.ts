import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import { Product } from "../products/products.model";
import { Recipe } from "../recipes/recipes.model";

@Table({ tableName: 'recipes_products', createdAt:false,updatedAt:false })
export class RecipesProducts extends Model<RecipesProducts> {

    @ForeignKey(()=>Recipe)
    @Column({ type: DataType.INTEGER })
    recipe_id: number

    @ForeignKey(()=>Product)
    @Column({ type: DataType.INTEGER })
    product_id: number

    @Column({ type: DataType.INTEGER })
    amount_product: number
}
