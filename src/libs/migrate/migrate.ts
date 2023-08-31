import fs from "fs";
import { IDataFile } from "../../types/prevNumbers";
import { logger } from "../logger/logger";

const migrateDbFile = () => {
	const dir = `${__dirname}/../../db`;

	fs.access(dir + "/data.json", (err) => {
		if (err) {
			const data: IDataFile = {
				archive: 1,
				network: 1,
				quest: 1,
				service: 1
			};

			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir);
			}

			fs.writeFileSync(dir + "/data.json", JSON.stringify(data));

			logger.info("migrate data.json file");
		}
	});
};

migrateDbFile();
