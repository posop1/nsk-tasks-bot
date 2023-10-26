/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IProjects {
	items: IProjectsItem[];
	included: IProjectsIncluded;
}

export interface IProjectsItem {
	id: string;
	createdAt: string;
	updatedAt: string;
	name: string;
	background: IProjectsBackground;
	backgroundImage: any;
}

export interface IProjectsBackground {
	name: string;
	type: string;
}

export interface IProjectsIncluded {
	users: IProjectsUser[];
	projectManagers: IProjectsProjectManager[];
	boards: IProjectsBoard[];
	boardMemberships: IProjectsBoardMembership[];
}

export interface IProjectsUser {
	id: string;
	createdAt: string;
	updatedAt: string;
	email: string;
	isAdmin: boolean;
	name: string;
	username: any;
	phone: any;
	organization: any;
	language: any;
	subscribeToOwnCards: boolean;
	deletedAt: any;
	avatarUrl: any;
}

export interface IProjectsProjectManager {
	id: string;
	createdAt: string;
	updatedAt: any;
	projectId: string;
	userId: string;
}

export interface IProjectsBoard {
	id: string;
	createdAt: string;
	updatedAt?: string;
	position: number;
	name: string;
	projectId: string;
	cardsCount?: number;
}

export interface IProjectsBoardMembership {
	id: string;
	createdAt: string;
	updatedAt: any;
	role: string;
	canComment: any;
	boardId: string;
	userId: string;
}
