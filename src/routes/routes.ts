import express from "express";
import { createTask, editTask, deleteTask, searchTask } from "../controllers/tasks.controller";
import { createCompany, editCompany, deleteCompany, searchCompany } from "../controllers/company.controller";
import { login, register, searchUser } from "../controllers/user.controller";

const router = express.Router();

// ROTAS TAREFAS
router.post("/create-task", createTask);
router.put("/edit-task/:id", editTask);
router.delete("/delete-task/:id", deleteTask)
router.get("/task", searchTask)

//ROTAS COMPANY
router.post("/create-company", createCompany);
router.put("/edit-company/:id", editCompany);
router.delete("/delete-company/:id", deleteCompany);
router.get("/company", searchCompany);

//ROTAS USER
router.post("/login", login);
router.post("/register", register);
router.get("/users", searchUser)


export default router;