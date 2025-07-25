import { Request, Response } from "express";
import Task from "../models/Task";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.JWT_TOKEN;

if (!TOKEN) {
  throw new Error("Variável de ambiente JWT_TOKEN não está definida.");
}

export const searchTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find()

    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao buscar chamados", error: error.message });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, helpdesk, description, author, company, priority, status } = req.body;
    console.log("REQ BODY:", req.body);

    const newTask = new Task({ title, helpdesk, description, author, company, priority, status });
    await newTask.save();

    res.status(201).json({ message: "Chamado criado com sucesso", chamado: newTask });
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao criar chamado", error: error.message });
  }
};


export const editTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, helpdesk, description, author, company, priority, status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, helpdesk, description, author, company, priority, status, updatedAt: Date.now() }
    );

    if (!updatedTask) {
      res.status(404).json({ message: "Chamado não encontrado" });
      return;
    }

    res.json({ message: "Chamado atualizado com sucesso", chamado: updatedTask });
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao atualizar chamado", error: error.message });
  }
};


export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      res.status(404).json({ message: "Chamado não encontrado" });
      return;
    }

    res.json({ message: "Chamado excluído com sucesso", chamado: deletedTask });
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao excluir chamado", error: error.message });
  }
};