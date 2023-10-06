import fs from "fs";
import { logger } from "../logger/logger";
import { IDataFile } from "../../app/types/dataFile";

const dir = `${__dirname}/../../db/data.json`;

const writeBoardsData = (obj: IDataFile[]) => {
	try {
		const rawData = JSON.stringify(obj);

		fs.writeFileSync(dir, rawData);
	} catch (error) {
		logger.error("Storage - write file successfully");
	}
};

const readBoardsData = () => {
	try {
		const rawData = fs.readFileSync(dir, "utf8");

		const data: IDataFile[] = JSON.parse(rawData);

		return data;
	} catch (error) {
		logger.error(error, "Storage - read prev number");
	}
};

export const storage = {
	writeBoardsData,
	readBoardsData
};
