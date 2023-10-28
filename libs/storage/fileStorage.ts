import fs from "fs";
import { logger } from "../logger/logger";
import { IBoardDataFile, ICardDataFile } from "../../app/types/dataFile";

const boardsDir = `${__dirname}/../../db/boards.json`;
const cardsDir = `${__dirname}/../../db/cards.json`;

const writeBoardsData = (obj: IBoardDataFile[]) => {
	try {
		const rawData = JSON.stringify(obj);

		fs.writeFileSync(boardsDir, rawData);
	} catch (error) {
		logger.error("Storage - write boards data file successfully");
	}
};

const readBoardsData = () => {
	try {
		const rawData = fs.readFileSync(boardsDir, "utf8");

		const data: IBoardDataFile[] = JSON.parse(rawData);

		return data;
	} catch (error) {
		logger.error(error, "Storage - read boards data file prev number");
	}
};

const writeCardsData = (obj: ICardDataFile[]) => {
	try {
		const rawData = JSON.stringify(obj);

		fs.writeFileSync(cardsDir, rawData);
	} catch (error) {
		logger.error(error, "Storage - write cards data file successfully");
	}
};

const readCardsData = () => {
	try {
		const rawData = fs.readFileSync(cardsDir, "utf8");

		const data: ICardDataFile[] = JSON.parse(rawData);

		return data;
	} catch (error) {
		logger.error(error, "Storage - read cards data file prev number");
	}
};

export const storage = {
	writeBoardsData,
	readBoardsData,
	writeCardsData,
	readCardsData
};
