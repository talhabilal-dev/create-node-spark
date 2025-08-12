import dotenv from "dotenv";
        
        dotenv.config();

        const ENV = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
    MYSQL_HOST: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      MYSQL_DATABASE: process.env.MYSQL_DATABASE,
      MYSQL_USER: process.env.MYSQL_USER,
      MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
};

export default ENV;