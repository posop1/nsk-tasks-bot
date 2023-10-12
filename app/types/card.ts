/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICard {
	item: ICardItem;
	included: ICardIncluded;
}

export interface ICardItem {
	id: string;
	createdAt: string;
	updatedAt: string;
	position: number;
	name: string;
	description: string;
	dueDate: any;
	stopwatch: any;
	boardId: string;
	listId: string;
	creatorUserId: string;
	coverAttachmentId: any;
	isSubscribed: boolean;
}

export interface ICardIncluded {
	cardMemberships: ICardCardMembership[];
	cardLabels: ICardCardLabel[];
	tasks: ICardTasks[];
	attachments: any[];
}

export interface ICardTasks {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	position: string;
	name: string;
	isCompleted: boolean;
	cardId: string;
}

export interface ICardCardMembership {
	id: string;
	createdAt: string;
	updatedAt: any;
	cardId: string;
	userId: string;
}

export interface ICardCardLabel {
	id: string;
	createdAt: string;
	updatedAt: any;
	cardId: string;
	labelId: string;
}
