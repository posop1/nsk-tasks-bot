import fs from "fs";
import { logger } from "../logger/logger";
import { IDataFile } from "../../types/prevNumbers";

const writePrevNumber = (obj: IDataFile) => {
	try {
		const rawdata = JSON.stringify(obj);

		fs.writeFileSync(`${__dirname}/data.json`, rawdata);

		logger.info("write file successfully");
	} catch (error) {
		logger.error("write file successfully");
	}
};

const readPrevNumber = () => {
	try {
		const rawdata = fs.readFileSync(`${__dirname}/data.json`, "utf8");

		const data: IDataFile = JSON.parse(rawdata);

		return data;
	} catch (error) {
		logger.error(error, "read prev number");
	}
};

export const storage = {
	writePrevNumber,
	readPrevNumber
};
