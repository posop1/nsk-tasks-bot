import fs from "fs";
import { logger } from "../logger/logger";
// import { fetch } from "../../app/api/api";
import { IDataFile } from "../../app/types/dataFile";
import { storage } from "../storage/fileStorage";
import { config } from "../../app/config/config";
import { IProjects } from "../../app/types/projects";
import { IBoard } from "../../app/types/board";

const { ACCESSTOKEN, APP_URL } = config;

const setCount = () => {
	setTimeout(async () => {
		// const boards = await fetch.getAllBoards();
		const boards: IBoard[] = await fetch(`${APP_URL}/api/projects`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${ACCESSTOKEN}`
			}
		}).then((res) => res.json());

		if (!boards) {
			return logger.error("Migrate - boards not found");
		}

		const fileData = boards.map((item) => {
			const boardsData: IDataFile = {
				...item.item,
				count: item.included.cards.length
			};

			return boardsData;
		});

		storage.writeBoardsData(fileData);
		logger.info("Migrate - set count");
	}, 1000);
};

const migrateDbFile = async () => {
	const dir = `${__dirname}/../../db`;
	// const projects = await fetch.getProjects();
	const projects: IProjects = await fetch(`${APP_URL}/api/projects`, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${ACCESSTOKEN}`
		}
	}).then((res) => res.json());

	if (!projects) {
		return logger.error("Migrate - projects not found");
	}

	const dataProjects: IDataFile[] = projects.included.boards.map((item) => {
		item = {
			...item,
			count: 1
		};

		return item;
	});

	fs.access(dir + "/data.json", (err) => {
		if (err) {
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir);
			}

			fs.writeFileSync(dir + "/data.json", JSON.stringify(dataProjects));

			logger.info("Migrate - data.json file wrote");
		}
	});

	setCount();
};

migrateDbFile();
