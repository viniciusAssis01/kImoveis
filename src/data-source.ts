import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";

const settings = (): DataSourceOptions => {
  const entitiesPath: string = path.join(__dirname, "./entities/**.{ts,js}");
  const migrationPath: string = path.join(__dirname, "./migrations/**.{ts,js}");
  const nodeEnv: string | undefined = process.env.NODE_ENV;

  /* essa verificação é para qndo rodarnos o npm run test | caso rodarmos o npm run dev, ele cai no return
    abaixo fizemos uma condicional para verificar se o ambiente de execução do projeto é o de test, caso seja, a nossa aplicação irá se conectar em um banco de dados sqlite e armazenar os dados em memória (na memoria volatim da maquina). Nesse caso, o syncronize fica como true para que o banco de dados em sqlite receba as entidades de forma automática, sem necessidade de executar as migrations. 
    
    Usamos o banco sqlite em memória com as configurações acima, pois ele irá excluir as tabelas e dados do banco em memória toda vez que os testes terminarem de executar. E a cada nova execução, as tabelas e os dados serão criados do zero. Isso evitar inconsistência de dados em nossos testes.
    
    esse nodeEnv vem do arquivo  "package.json" em SCRIPTS > propriedade DEV*/
  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [entitiesPath],
    };
  }
  //": :""é um indicador para o DB executar na memoria ram
    //qndo o sincronize está igual a true: só precisamos do entites (e ñ mais do migrations)

    /* ñ esqueça de configurar um script de execução de testse dentro do package.json. colocando os 3 seguintes scripts (dentro da propriedade scripts):
    "test": "cross-env NODE_ENV=test SECRET_KEY=chavesecreta jest --forceExit --runInBand",
    "dev": "tsnd --cls --rs --ignore-watch node_modules src/server.ts",
    "typeorm": "typeorm-ts-node-commonjs"
    */
  const dbUrl: string | undefined = process.env.DATABASE_URL;

  if (!dbUrl) throw new Error("Missing env var: 'DATABASE_URL'");

  return {
    type: "postgres",
    url: dbUrl,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationPath],
  };
};

const AppDataSource = new DataSource(settings());

export { AppDataSource };
