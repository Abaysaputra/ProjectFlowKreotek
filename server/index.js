import express from 'express';
import cors from 'cors';
import { sequelize, User, Project } from './models/index.js'; // 👈 pastikan ini sesuai dengan export-mu
import projectRoutes from './routes/projectRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRoutes);

// ✅ Tambahkan endpoint debug
app.get('/debug/users', async (req, res) => {
  try {
    const users = await User.findAll(); // Bukan db.User
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Koneksi DB dan jalankan server
try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('✅ Database connected & synced');
} catch (error) {
  console.error('❌ Database connection failed:', error);
}

app.listen(5000, () => {
  console.log('🚀 Backend ready at http://localhost:5000');
});
