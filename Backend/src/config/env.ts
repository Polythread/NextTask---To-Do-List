const _config = {
  mongo_url: process.env.MONGO_URL!,
  jwt_key: process.env.SECRET_KEY!,
};

export const config = Object.freeze(_config);
