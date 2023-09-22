import { Draft } from '@reduxjs/toolkit';
import { IAlbum, IItem, IItemsState, IPost, ISameItems, ISameItemsState, ITask } from './types';
import { SORT_OPTIONS } from '.';

type TasksUpdArg = {
	data: ITask[],
	sort: string,
};
export function updateDisplayTasks({data, sort}: TasksUpdArg){
	const sortCb = SORT_OPTIONS.tasks.filter((opt) => opt.name == sort)[0].cb;
	return  [...data].sort(sortCb);
}

type ItemsUpdArg = {
	data: ISameItems[],
	sort: string,
	userNames: Array<string>,
	page: "posts" | "albums",
	title: string,
	favorite: boolean,
};
export function updateDisplayItems({data, sort, userNames, favorite, title,page}: ItemsUpdArg ){
	const filtered = data.filter(p =>  userNames.includes('all') ? true : userNames.includes(p.userName)).filter(p => title ? p.title.includes(title) : true).filter(p => favorite ? p.favorite : true);

	const sortCb = SORT_OPTIONS[page].filter((opt) => opt.name == sort)[0].cb;

	return  filtered.sort(sortCb);
}


export function editItem(state: Draft<IItemsState>, { payload }:
	{
		payload: Partial<IItem>;
		type: string;
	}){
		const newData = [...state.data];
		const iData = newData.findIndex((p) => p.id === payload.id);
		newData[iData] = { ...newData[iData], ...payload };
		state.data = newData;
}

export function deleteItem (state: Draft<IItemsState>, { payload }:
	{
		payload: number;
		type: string;
	}) {
	state.data = state.data.filter((post) => post.id !== payload);
}

export function setPerPage (state: Draft<IItemsState>, { payload }:
	{
		payload: string;
		type: string;
	}) {
	state.perPage = payload;
}

export function changeUserFilter(state: Draft<ISameItemsState>, { payload }:
	{
		payload: Array<string>;
		type: string;
	}) {
	state.filter = {
		...state.filter,
		userNames: [...payload],
	};
}

export function changeSingleFilter(state: Draft<ISameItemsState>, { payload }:
	{
		// eslint-disable-next-line prettier/prettier
		payload: { value: string | boolean, prop: keyof IPost | keyof IAlbum};
		type: string;
	}) {
	const { value } = payload;
	const prop = payload.prop;
	state.filter = {
		...state.filter,
		[prop]: value,
	};
}


export function changeSort (state: Draft<IItemsState>, { payload }:
	{
		payload: string;
		type: string;
	}) {
	state.sort = payload;
}

