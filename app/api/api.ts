import { logger } from "../../libs/logger/logger";
import { storage } from "../../libs/storage/fileStorage";
import { IBoard } from "../types/board";
import { ICard } from "../types/card";
import { IProjects } from "../types/projects";
import api from "./instance";

const getProjects = async () => {
	try {
		const { data } = await api.get<IProjects>("/projects");

		return data;
	} catch (error) {
		return logger.error(error, "API - get projects error");
	}
};

const getAllBoards = async () => {
	try {
		const projectsData = storage.readBoardsData();

		if (!projectsData) {
			return logger.error("API - projects data not found");
		}

		const boards: IBoard[] = [];

		for (let i = 0; i < projectsData.length; i++) {
			const { data } = await api.get<IBoard>(`/boards/${projectsData[i].id}`);

			boards.push(data);
		}

		return boards;
	} catch (error) {
		return logger.error(error, "API - get all boards");
	}
};

const getCard = async (id: string) => {
	try {
		const { data } = await api.get<ICard>(`/cards/${id}`);

		return data;
	} catch (error) {
		return logger.error(error, "API - get card");
	}
};

export const fetch = {
	getProjects,
	getAllBoards,
	getCard
};
