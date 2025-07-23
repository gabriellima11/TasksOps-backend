"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_controller_1 = require("../controllers/tasks.controller");
const company_controller_1 = require("../controllers/company.controller");
const router = express_1.default.Router();
// ROTAS TAREFAS
router.post("/create-task", tasks_controller_1.createTask);
router.put("/edit-task/:id", tasks_controller_1.editTask);
router.delete("/delete-task/:id", tasks_controller_1.deleteTask);
router.get("/task", tasks_controller_1.searchTask);
//ROTAS COMPANY
router.post("/create-company", company_controller_1.createCompany);
router.put("/edit-company/:id", company_controller_1.editCompany);
router.delete("/delete-company/:id", company_controller_1.deleteCompany);
router.get("/company", company_controller_1.searchCompany);
exports.default = router;
