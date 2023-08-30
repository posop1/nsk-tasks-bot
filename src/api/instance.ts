import axios from "axios";
import { getConfig } from "../config/config";

const { ACCESSTOKEN } = getConfig();

const api = axios.create({
	baseURL: "https://todo.nskcollege.ru/api/",
	headers: {
		accept: "application/json",
		Authorization: ACCESSTOKEN
	}
});

export default api;
