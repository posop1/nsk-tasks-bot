export interface IDataFile {
	id: string;
	createdAt: string;
	updatedAt?: string;
	position: number;
	name: string;
	projectId: string;
	count?: number;
}
