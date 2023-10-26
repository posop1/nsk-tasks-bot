/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IBoardDataFile {
	id: string;
	createdAt: string;
	updatedAt?: string;
	position: number;
	name: string;
	projectId: string;
	cardsCount?: number;
}

export interface ICardDataFile {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	position: number;
	name: string;
	description: string;
	dueDate?: string;
	stopwatch: any;
	boardId: string;
	listId: string;
	creatorUserId: string;
	coverAttachmentId: any;
	isSubscribed: boolean;
}
