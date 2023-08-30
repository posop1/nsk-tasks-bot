/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Root {
	item: Item;
	included: Included;
}

export interface Item {
	id: string;
	createdAt: string;
	updatedAt: any;
	position: number;
	name: string;
	projectId: string;
}

export interface Included {
	users: User[];
	boardMemberships: BoardMembership[];
	labels: Label[];
	lists: List[];
	cards: Card[];
	cardMemberships: CardMembership[];
	cardLabels: CardLabel[];
	tasks: Task[];
	attachments: any[];
	projects: Project[];
}

export interface User {
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

export interface BoardMembership {
	id: string;
	createdAt: string;
	updatedAt: any;
	role: string;
	canComment: any;
	boardId: string;
	userId: string;
}

export interface Label {
	id: string;
	createdAt: string;
	updatedAt?: string;
	position: number;
	name: string;
	color: string;
	boardId: string;
}

export interface List {
	id: string;
	createdAt: string;
	updatedAt: any;
	position: number;
	name: string;
	boardId: string;
}

export interface Card {
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

export interface CardMembership {
	id: string;
	createdAt: string;
	updatedAt: any;
	cardId: string;
	userId: string;
}

export interface CardLabel {
	id: string;
	createdAt: string;
	updatedAt: any;
	cardId: string;
	labelId: string;
}

export interface Task {
	id: string;
	createdAt: string;
	updatedAt?: string;
	position: number;
	name: string;
	isCompleted: boolean;
	cardId: string;
}

export interface Project {
	id: string;
	createdAt: string;
	updatedAt: string;
	name: string;
	background: Background;
	backgroundImage: any;
}

export interface Background {
	name: string;
	type: string;
}
