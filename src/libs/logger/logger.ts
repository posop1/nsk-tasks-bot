import pino from "pino";
import { getConfig } from "../../config/config";

const levels = {
	emerg: 80,
	alert: 70,
	crit: 60,
	error: 50,
	warn: 40,
	notice: 30,
	info: 20,
	debug: 10
};

const loggerConfig = {
	level: process.env.PINO_LOG_LEVEL || "info",
	customLevels: levels,
	useOnlyCustomLevels: true,
	formatters: {
		level: (label: string) => {
			return { level: label.toUpperCase() };
		}
	},
	timestamp: pino.stdTimeFunctions.isoTime
};

export const getLogger = () => {
	const { ENV } = getConfig();

	if (ENV === "prod") {
		return pino(loggerConfig, pino.destination("./log/app.log"));
	} else {
		return pino(loggerConfig);
	}
};
