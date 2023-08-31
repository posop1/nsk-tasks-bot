import fs from "fs";
import { logger } from "../logger/logger";
import { IDataFile } from "../../types/prevNumbers";

const dir = `${__dirname}/../../db/data.json`;

const writeCardsCount = (obj: IDataFile) => {
	try {
		const rawdata = JSON.stringify(obj);

		fs.writeFileSync(dir, rawdata);

		logger.info("write file successfully");
	} catch (error) {
		logger.error("write file successfully");
	}
};

const readCardsCount = () => {
	try {
		const rawdata = fs.readFileSync(dir, "utf8");

		const data: IDataFile = JSON.parse(rawdata);

		return data;
	} catch (error) {
		logger.error(error, "read prev number");
	}
};

export const storage = {
	writeCardsCount,
	readCardsCount
};
