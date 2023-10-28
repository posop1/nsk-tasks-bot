import fs from "fs";
import { logger } from "../logger/logger";
import { get } from "../../app/api/get";
import { IBoardDataFile, ICardDataFile } from "../../app/types/dataFile";
import { storage } from "../storage/fileStorage";

const setCount = () => {
	setTimeout(async () => {
		const boards = await get.allBoards();

		if (!boards) {
			return logger.error("Migrate - boards not found");
		}

		const fileData = boards.map((item) => {
			const boardsData: IBoardDataFile = {
				...item.item,
				cardsCount: item.included.cards.length
			};

			return boardsData;
		});

		storage.writeBoardsData(fileData);
		logger.info("Migrate - set count");
	}, 1000);
};

export const migrateBoardsFile = async () => {
	const dir = `${__dirname}/../../db`;
	const projects = await get.projects();

	if (!projects) {
		return logger.error("Migrate - projects not found");
	}

	const dataProjects: IBoardDataFile[] = projects.included.boards.map((item) => {
		item = {
			...item,
			cardsCount: 1
		};

		return item;
	});

	fs.access(dir + "/boards.json", (err) => {
		if (err) {
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir);
			}

			fs.writeFileSync(dir + "/boards.json", JSON.stringify(dataProjects));

			logger.info("Migrate - boards.json file wrote");
		}
	});

	setCount();
	migrateCardsFile();
};

const migrateCardsFile = () => {
	const dir = `${__dirname}/../../db`;

	setTimeout(async () => {
		const boards = await get.allBoards();

		if (!boards) {
			return logger.error("Migrate - boards not found");
		}

		const cards: ICardDataFile[] = [];

		boards.map((board) => {
			board.included.cards.map((card) => {
				cards.push(card);
			});
		});

		fs.access(dir + "/cards.json", (err) => {
			if (err) {
				fs.writeFileSync(dir + "/cards.json", JSON.stringify(cards));

				logger.info("Migrate - cards.json file wrote");
			}
		});
	}, 2000);
};
