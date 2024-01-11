import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

const start = async () =>{
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
      .setTitle('ИС "Солодовые напитки"')
      .setDescription('Полная документация для ИС "Солодовые напитки" с описанием всех ' +
          'методов, схем, что принимает и что возврящается')
      .setVersion('1.0.0')
      .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app,document)


  await app.listen(PORT, () => console.log('Server start on port ' + PORT))
}

start()