const jwt = require('jsonwebtoken');
const { PrismaClient } = require('../generated/prisma');
const { z } = require('zod');
const prisma = new PrismaClient();
const authSchema = z.object({
    token: z.string().min(1)
});

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const validatedData = authSchema.parse({ token });
        const decodedToken = jwt.verify(validatedData.token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decodedToken.userId }
        });

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.userId = user.id; 
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authMiddleware;