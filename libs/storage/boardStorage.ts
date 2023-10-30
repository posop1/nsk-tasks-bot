import { IBoardDataFile } from "../../app/types/dataFile";
import { logger } from "../logger/logger";
import fs from "fs";

const boardsDir = `${__dirname}/../../db/boards.json`;

const write = (obj: IBoardDataFile[]) => {
	try {
		const rawData = JSON.stringify(obj);

		fs.writeFileSync(boardsDir, rawData);
	} catch (error) {
		logger.error("Storage - write boards data file successfully");
	}
};

const read = () => {
	try {
		const rawData = fs.readFileSync(boardsDir, "utf8");

		const data: IBoardDataFile[] = JSON.parse(rawData);

		return data;
	} catch (error) {
		logger.error(error, "Storage - read boards data file prev number");
	}
};

export const boards = {
	write,
	read
};
