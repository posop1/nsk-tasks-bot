import { logger } from "../libs/logger/logger";
import { Root } from "../types/board";
import api from "./instance";

export const getNetworkBoard = async () => {
	try {
		const { data } = await api.get<Root>("/boards/1054158202398049360");

		logger.info("get network board");

		return data;
	} catch (error) {
		return logger.error(error, "get network board");
	}
};

export const getServiceBoard = async () => {
	try {
		const { data } = await api.get<Root>("/boards/1054158451237717074");

		logger.info("get service board");

		return data;
	} catch (error) {
		return logger.error(error, "get service board");
	}
};

export const getQuestBoard = async () => {
	try {
		const { data } = await api.get<Root>("/boards/1054158675112887380");

		logger.info("get quest board");

		return data;
	} catch (error) {
		return logger.error(error, "get quest board");
	}
};

export const getArchiveBoard = async () => {
	try {
		const { data } = await api.get<Root>("/boards/1054925397256308248");

		logger.info("get archive board");

		return data;
	} catch (error) {
		return logger.error(error, "get archive board");
	}
};
