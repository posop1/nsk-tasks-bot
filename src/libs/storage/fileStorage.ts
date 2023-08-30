import fs from "fs";
import { logger } from "../logger/logger";

interface IDataFile {
	number: number;
}

// export const checkFile = () => {
// 	const mockdata = {
// 		number: 1
// 	};

// 	const rawMockdata = JSON.stringify(mockdata);

// 	fs.open(`${__dirname}/data.json`, "w", (err) => {
// 		if (err) {
// 			return logger.error("data.json");
// 		}

// 		fs.writeFileSync(`${__dirname}/data.json`, rawMockdata);
// 		return;
// 	});
// };

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

		return data.number;
	} catch (error) {
		logger.error(error, "read prev number");
	}
};

export const storage = {
	writePrevNumber,
	readPrevNumber
};
