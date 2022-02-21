export default {
    secretKey: process.env.JWT_SECRET_KEY as string,
    expiresIn: process.env.JWT_EXPIRES_IN as string,
}