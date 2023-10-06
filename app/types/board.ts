/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IBoard {
	item: IBoardItem;
	included: IBoardIncluded;
}

export interface IBoardItem {
	id: string;
	createdAt: string;
	updatedAt: any;
	position: number;
	name: string;
	projectId: string;
}

export interface IBoardIncluded {
	users: IBoardUser[];
	boardMemberships: IBoardBoardMembership[];
	labels: IBoardLabel[];
	lists: IBoardList[];
	cards: IBoardCard[];
	cardMemberships: IBoardCardMembership[];
	cardLabels: IBoardCardLabel[];
	tasks: IBoardTask[];
	attachments: any[];
	projects: IBoardProject[];
}

export interface IBoardUser {
	id: string;
	createdAt: string;
	updatedAt?: string;
	email: string;
	isAdmin: boolean;
	name: string;
	username?: string;
	phone: any;
	organization: any;
	language: any;
	subscribeToOwnCards: boolean;
	deletedAt: any;
	avatarUrl: any;
}

export interface IBoardBoardMembership {
	id: string;
	createdAt: string;
	updatedAt: any;
	role: string;
	canComment: any;
	boardId: string;
	userId: string;
}

export interface IBoardLabel {
	id: string;
	createdAt: string;
	updatedAt?: string;
	position: number;
	name: string;
	color: string;
	boardId: string;
}

export interface IBoardList {
	id: string;
	createdAt: string;
	updatedAt: any;
	position: number;
	name: string;
	boardId: string;
}

export interface IBoardCard {
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

export interface IBoardCardMembership {
	id: string;
	createdAt: string;
	updatedAt: any;
	cardId: string;
	userId: string;
}

export interface IBoardCardLabel {
	id: string;
	createdAt: string;
	updatedAt: any;
	cardId: string;
	labelId: string;
}

export interface IBoardTask {
	id: string;
	createdAt: string;
	updatedAt?: string;
	position: number;
	name: string;
	isCompleted: boolean;
	cardId: string;
}

export interface IBoardProject {
	id: string;
	createdAt: string;
	updatedAt: string;
	name: string;
	background: IBoardBackground;
	backgroundImage: any;
}

export interface IBoardBackground {
	name: string;
	type: string;
}
