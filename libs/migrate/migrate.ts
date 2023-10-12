import fs from "fs";
import { logger } from "../logger/logger";
import { get } from "../../app/api/get";
import { IDataFile } from "../../app/types/dataFile";
import { storage } from "../storage/fileStorage";

const setCount = () => {
	setTimeout(async () => {
		const boards = await get.allBoards();

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

export const migrateDbFile = async () => {
	const dir = `${__dirname}/../../db`;
	const projects = await get.projects();

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
