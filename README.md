# 🚀 Reto Técnico - Backend NodeJS con Serverless
# JUAN CARLOS DE LA CRUZ CHINGA - 937570438
Este proyecto es parte de un reto técnico en el que se desarrolla una API REST usando **Node.js**, **TypeScript**, **AWS Lambda**, **API Gateway** y **DynamoDB**, desplegado mediante **Serverless Framework**.

La API fusiona datos de la **API pública de Star Wars** con el **clima actual** y los almacena en una tabla DynamoDB. Además, permite almacenar registros personalizados y consultar el historial con caché. Todo está instrumentado con **CloudWatch Logs**y **Rate Limiting** por endpoint.

---

## 📦 Tecnologías utilizadas

- Node.js 20
- TypeScript
- Serverless Framework
- AWS Lambda
- API Gateway
- DynamoDB
- CloudWatch (logging)
- Swagger (documentación via `serverless-aws-documentation`)
- Rate limiting por API Gateway

---

## ⚙️ Requisitos previos

- Node.js ≥ 18
- AWS CLI instalado
- Tener una cuenta AWS activa
- Serverless Framework instalado globalmente:


🚀 Pasos para levantar el proyecto
1. Clonar el repositorio
git clone https://github.com/tu-usuario/reto-backend-node.git
cd reto-backend-node

3. Instalar dependencias
npm install

5. Configurar credenciales AWS
   
Ejecuta:
aws configure

Y coloca:
AWS Access Key ID:        AKIA...        ← desde IAM

AWS Secret Access Key:    00nEw...        ← desde IAM

Default region name:      us-east-1

Default output format:    json


4. Crear el archivo .env
5. 
En la raíz del proyecto crea un archivo .env con lo siguiente:

AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=00nEw...
AWS_REGION=us-east-1

5. Desplegar a AWS ☁️
npx serverless deploy

Esto:


Crea tus funciones Lambda

Expone los endpoints vía API Gateway

Crea tu tabla DynamoDB

Configura logging, throttling


6. Ejecutar localmente 🔄
   
npx serverless offline

Esto levanta un servidor en http://localhost:3000 simulando AWS Lambda + API Gateway.


🧪 Endpoints disponibles

Método	Path	Descripción

GET	/fusionados	Fusiona datos de SWAPI y clima y los guarda

POST	/almacenar	Almacena un objeto personalizado

GET	/historial	Devuelve el historial desde cache o base de datos

POST	/login (opcional)	Devuelve token JWT para proteger endpoints


