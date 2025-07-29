"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_controller_1 = require("../controllers/tasks.controller");
const company_controller_1 = require("../controllers/company.controller");
const user_controller_1 = require("../controllers/user.controller");
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
//ROTAS USER
router.post("/login", user_controller_1.login);
router.post("/register", user_controller_1.register);
router.get("/users", user_controller_1.searchUser);
router.put("/edit-user/:id", user_controller_1.editUser);
router.delete("/delete-user/:id", user_controller_1.deleteUser);
exports.default = router;
