import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { CreateOrderDTO } from './dto/CreateOrder.dto';
import { CustomersService } from 'src/customers/customers.service';
import { ManufacturersService } from 'src/manufacturers/manufacturers.service';
import * as Excel from 'exceljs';


@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order) private orderRepository: typeof Order,
        private customerService: CustomersService,
        private manufacturerService : ManufacturersService
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

    async getStats(login : string){
        let manufacturer = await this.manufacturerService.searchManufacturerByLogin(login)

        let request = `with sum_by_month as (
            select date_trunc('MONTH', "createdAt") as date, sum(price) 
            from "Orders"
            where customer_id = ${manufacturer.manufacturer_id}
            group by date_trunc('MONTH', "createdAt")
            order by date
        ),
        profit as (
            select *,
            lag(sum) over(order by date) as last_month
            from sum_by_month
        )
        select *, 
            sum - last_month as diff_by_last_month,
            COALESCE(ROUND((cast(sum - last_month as numeric) / cast(last_month as numeric)) * 100, 2), 0) AS profit_change_percent
        from profit`

        const result = await this.orderRepository.sequelize?.query(request, {
            type: 'SELECT',
        });

        return result;
    }

    // async createExcelFile(login : string){
    //     const workbook = new Excel.Workbook();
    //     const worksheet = workbook.addWorksheet('Статистика');
    //     worksheet.columns = [
    //         { header: 'Месяц', key: 'date', width: 30 },
    //         { header: 'Зарабаток', key: 'sum', width: 30 },
    //         { header: 'Прибыль', key: 'diff_by_last_month', width: 30 },
    //         { header: 'Прибыль в %', key: 'profit_change_percent', width: 30 }
    //     ];
    //     let stats = await this.getStats(login)
    //     stats.forEach((row)=>{
    //         worksheet.addRow(row)
    //     })
    //     console.log(1)
    //     await workbook.xlsx.writeFile('example.xlsx')
    // }
}
