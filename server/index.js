import express from 'express';
import cors from 'cors';
import db from './models/index.js';
import projectRoutes from './routes/projectRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Gunakan router
app.use('/api/projects', projectRoutes);
app.use('/api', userRoutes); 

try {
  await db.sequelize.authenticate();
  await db.sequelize.sync();
  console.log('✅ Database connected & synced');
} catch (error) {
  console.error('❌ Database connection failed:', error);
}

app.listen(5000, () => {
  console.log('🚀 Backend ready at http://localhost:5000');
});
