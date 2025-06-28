import express from 'express';
import cors from 'cors';
import db from './config/database.js';
import projectRoutes from './routes/projectRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRoutes);

try {
  await db.authenticate();
  await db.sync();
  console.log('✅ Database connected & models synced');
} catch (error) {
  console.error('❌ DB error:', error);
}

app.listen(5000, () => {
  console.log('🚀 Backend ready at http://localhost:5000');
});

await db.sync({ alter: true }); // Hanya di development
