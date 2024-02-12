import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { CreateOrderDTO } from './dto/CreateOrder.dto';
import { CustomersService } from 'src/customers/customers.service';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order) private orderRepository: typeof Order,
        private customerService: CustomersService,
    ) {}

    async createOrder(dto: CreateOrderDTO, login: string){
        const customer = await this.customerService.searchCustomerByLogin(login);
        let prices = await this.getPrice()
        console.log(dto)
        let price = 0;
        
        for (let i of prices){
            console.log(i)
            if (dto.recipe_id == i.recipe_id){
                price = i.sum_price
            }
        }

        let total_sum = price * dto.amount
        let date = new Date()
        let delivery_date = date.setDate(date.getDate() + dto.amount + 3)
        let create_obj = {
            customer_id : customer.customer_id,
            recipe_id : dto.recipe_id,
            amount : dto.amount,
            delivery_date : delivery_date,
            price : total_sum
        }
        return await this.orderRepository.create(create_obj);
    }

    async getOrders(login : string) {
        const customer = await this.customerService.searchCustomerByLogin(login);
        return await this.orderRepository.findAll({where:{customer_id:customer.customer_id},include:{all:true}})
    }

    async getPrice(): Promise<any[]> {
        const query = `
        with price as (
            select rp.recipe_id, round((sum(amount_product * unit_price) * 1.3) / 100) * 100 as sum_price
            from recipes_products as rp
            left join products as p on rp.product_id = p.product_id
            group by rp.recipe_id
        )
        select r.recipe_id, p.sum_price 
        from recipes as r 
        left join price as p on p.recipe_id = r.recipe_id
        where p.sum_price is not null;
        `;

        const result = await this.orderRepository.sequelize?.query(query, {
            type: 'SELECT',
        });

        return result;
    }
}
