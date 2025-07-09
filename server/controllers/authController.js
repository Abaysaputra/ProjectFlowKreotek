    import { User } from "../models/index.js";
    import bcrypt from "bcrypt";
    import jwt from "jsonwebtoken";

    const SECRET_KEY = "RAHASIA123"; // Ganti dengan .env di production

    export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Password salah" });

        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1d" });

        res.json({
        message: "Login berhasil",
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    };

    export const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hash, role });
        res.status(201).json({ message: "User berhasil dibuat", user: newUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    };
