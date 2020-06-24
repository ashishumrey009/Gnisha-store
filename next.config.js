// must restart server whenever you make changes in next.config
module.exports = {
  prerenderPages: false,
  env: {
    MONGO_SRV: "mongodb+srv://RootUser:Pass@123@reactreserve-gky2f.mongodb.net/test?retryWrites=true&w=majority",
    JWT_SECRET: "mysecretkey",
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/doo7zsdii/image/upload",
    STRIPE_SECRET_KEY: "sk_test_51GxDOJLMAayKBVi2m6XWTuGP52eBR8GSJZunPGrcypvlifLkSSTTEharBNbgaT1qrHoQL5wbiVHv8JJfqupt1R6K00lV5bBkzg"
  }
};
