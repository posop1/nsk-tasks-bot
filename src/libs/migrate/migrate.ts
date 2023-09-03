import fs from "fs";
import { logger } from "../logger/logger";
import { fetch } from "../../api/api";

const migrateDbFile = async () => {
	const dir = `${__dirname}/../../db`;
	const projects = await fetch.getProjects();

	if (!projects) {
		return logger.error("projects not found");
	}

	const dataProjects = projects.included.boards.map((item) => {
		item = {
			...item,
			count: 1
		};

		return item;
	});

	console.log(dataProjects);

	fs.access(dir + "/data.json", (err) => {
		if (err) {
			if (!fs.existsSync(dir)) {
				fs.mkdirSync(dir);
			}

			fs.writeFileSync(dir + "/data.json", JSON.stringify(dataProjects));

			logger.info("migrate data.json file");
		}
	});
};

migrateDbFile();
