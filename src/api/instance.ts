import axios from "axios";
import { config } from "../config/config";

const { ACCESSTOKEN, APP_URL } = config;

const api = axios.create({
	baseURL: `${APP_URL}/api/`,
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${ACCESSTOKEN}`
	}
});

export default api;
