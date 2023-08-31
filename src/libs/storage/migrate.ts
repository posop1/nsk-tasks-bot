import fs from "fs";
import { logger } from "../logger/logger";
import { IDataFile } from "../../types/prevNumbers";

const checkFile = () => {
	fs.access(`${__dirname}/data.json`, (err) => {
		if (err) {
			const data: IDataFile = {
				archive: 1,
				network: 1,
				quest: 1,
				service: 1
			};

			fs.writeFileSync(`${__dirname}/data.json`, JSON.stringify(data));

			logger.info("migrate data.json file");
		}
	});
};

checkFile();
