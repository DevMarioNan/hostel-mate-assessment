const {PrismaClient} = require('../generated/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {z} = require('zod');

const prisma = new PrismaClient();

const createUser = async (email, password) => {
    const userSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8)
    });

    try {
        const validatedData = userSchema.parse({email, password});

        const existingUser = await prisma.user.findUnique({
            where: {email: validatedData.email}
        });
        if (existingUser) {
            return {error: 'User with this email already exists'};
        }

        const hashedPassword = await bcrypt.hash(validatedData.password, 10);

        const newUser = await prisma.user.create({
            data: {
                email: validatedData.email,
                password: hashedPassword
            }
        });

        return {message: 'User registered successfully'};
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {error: error.errors};
        }
        console.error(error);
        return {error: 'Internal server error'};
    }
}

const findUser = async (email, password) => {
    const userSchema = z.object({
        email: z.string().email(),
        password: z.string().min(8)
    });

    try {
        const validatedData = userSchema.parse({email, password});

        const user = await prisma.user.findUnique({
            where: {email: validatedData.email}
        });

        if (!user) {
            return {error: 'Invalid email or password'};
        }

        const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);
        if (!isPasswordValid) {
            return {error: 'Invalid email or password'};
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        return {token};
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {error: error.errors};
        }
        console.error(error);
        return {error: 'Internal server error'};
    }
}

module.exports = {
    createUser,
    findUser
};