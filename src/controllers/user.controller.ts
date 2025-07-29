import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { Request, Response } from "express";

dotenv.config()

const JWT_SECRET = process.env.JWT_TOKEN

if (!JWT_SECRET) {
  throw new Error("Variável de ambiente JWT_TOKEN não está definida.");
}

//LOGIN
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Verifica a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, admin: user.admin },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.status(200).json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        admin: user.admin
      }
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// REGISTER
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "E-mail já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      admin: false
    });

    res.status(201).json({
      message: "Usuário registrado com sucesso",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const searchUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find()

    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao buscar chamados", error: error.message });
  }
};

export const editUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, email, password, admin } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    if (typeof admin === "boolean") {
      user.admin = admin;
    }

    await user.save();

    res.status(200).json({
      message: "Usuário atualizado com sucesso",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        admin: user.admin,
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};


export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    res.json({ message: "Usuário excluído com sucesso", chamado: deletedUser });
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao excluir chamado", error: error.message });
  }
};