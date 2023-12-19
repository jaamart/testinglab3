"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const pg_1 = require("pg");
const express_1 = __importDefault(require("express"));
dotenv.config();
const client = new pg_1.Client({
    connectionString: process.env.PGURI
});
client.connect();
const app = (0, express_1.default)(), port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/api', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield client.query('SELECT * FROM users');
    res.send(rows);
}));
app.post('/api/clients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, shortname, id, corpform, bank, endofyear } = req.body;
        console.log(name, shortname, id, bank, endofyear, corpform);
        const newClient = yield client.query('INSERT INTO clients (clientid, clientname, shortname, bank, endofyear, corporateform) VALUES ($1, $2, $3, $4, $5, $6)', [id, name, shortname, bank, endofyear, corpform]);
        const newClientData = yield client.query('SELECT * FROM clients WHERE clientid = $1', [id]);
        res.status(200).json({ newClient: newClientData.rows[0] });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(500).json({ message: 'fel' });
        }
    }
}));
app.get('/api/clients', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield client.query('SELECT * FROM clients');
    res.send(rows);
}));
app.listen(port, () => {
    console.log(`Redo på ${port}`);
});