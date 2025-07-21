import { Request, Response } from "express";
import Company from "../models/Company";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.JWT_TOKEN;

if (!TOKEN) {
  throw new Error("Variável de ambiente JWT_TOKEN não está definida.");
}

export const searchCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const company = await Company.find()

    res.json(company);
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao buscar empresa", error: error.message });
  }
};

export const createCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.body;

    const newCompany = new Company({ title });
    await newCompany.save();

    res.status(201).json({ message: "Empresa criado com sucesso", chamado: newCompany });
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao criar empresa", error: error.message });
  }
};



export const editCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      { title }
    );

    if (!updatedCompany) {
      res.status(404).json({ message: "Empresa não encontrada" });
      return;
    }

    res.json({ message: "Empresa atualizado com sucesso", chamado: updatedCompany });
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao atualizar empresa", error: error.message });
  }
};


export const deleteCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedCompany = await Company.findByIdAndDelete(id);

    if (!deletedCompany) {
      res.status(404).json({ message: "Empresa não encontrado" });
      return;
    }

    res.json({ message: "Empresa excluído com sucesso", chamado: deletedCompany });
  } catch (error: any) {
    res.status(500).json({ message: "Erro ao excluir empresa", error: error.message });
  }
};