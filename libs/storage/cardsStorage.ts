import { ICardDataFile } from "../../app/types/dataFile";
import { logger } from "../logger/logger";
import fs from "fs";

const cardsDir = `${__dirname}/../../db/cards.json`;

const write = (obj: ICardDataFile[]) => {
	try {
		const rawData = JSON.stringify(obj);

		fs.writeFileSync(cardsDir, rawData);
	} catch (error) {
		logger.error(error, "Storage - write cards data file successfully");
	}
};

const read = () => {
	try {
		const rawData = fs.readFileSync(cardsDir, "utf8");

		const data: ICardDataFile[] = JSON.parse(rawData);

		return data;
	} catch (error) {
		logger.error(error, "Storage - read cards data file prev number");
	}
};

export const cards = {
	write,
	read
};
