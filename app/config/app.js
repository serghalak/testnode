
const config = {
    name: process.env.APP_NAME || 'passport-sequelize-pg',
    stage: process.env.STAGE || 'development',
    port: process.env.PORT || 5000,
    db: {
        url: process.env.DATABASE_URL,
        options: {
            dialect: 'postgres',
            native: false,
            pool: {
                max: 5,
                min: 1,
                idle: 100000
            },
            //logging: logger.debug
        }
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        public: process.env.JWT_PUBLIC,
        saltFactor: +process.env.SALT_FACTOR || 10,
        expiresIn: process.env.JWT_EXPIRES_IN
    },
};

export default config;