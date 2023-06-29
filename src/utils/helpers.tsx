import { Draft } from '@reduxjs/toolkit';
import { IAlbum, IItem, IItemsState, IPost } from './types';
import { SORT_OPTIONS } from '.';

export function editItem(state: Draft<IItemsState>, { payload }:
	{
		payload: IItem;
		type: string;
	}){
		const newData = [...state.data];
		const iData = newData.findIndex((p) => p.id === payload.id);
		newData[iData] = { ...newData[iData], ...payload };
		state.data = newData;
		const newDisplay = [...state.data];
		const iDisplay = newDisplay.findIndex((p) => p.id === payload.id);
		newDisplay[iDisplay] = { ...newDisplay[iDisplay], ...payload };
		state.display = newDisplay;
}

export function deleteItem (state: Draft<IItemsState>, { payload }:
	{
		payload: number;
		type: string;
	}) {
	state.data = state.data.filter((post) => post.id !== payload);
	state.display = state.display.filter((post) => post.id !== payload);
}

export function setPerPage (state: Draft<IItemsState>, { payload }:
	{
		payload: string;
		type: string;
	}) {
	state.perPage = payload;
}

export function changeUserFilter(state: Draft<IItemsState>, { payload }:
	{
		payload: Array<string>;
		type: string;
	}) {
	state.filter = {
		...state.filter,
		userNames: [...payload],
	};
}

export function changeSingleFilter(state: Draft<IItemsState>, { payload }:
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

export function filter (state: Draft<IItemsState>) {
	state.display = state.data.filter(p =>  state.filter.userNames.includes('all') ? true : state.filter.userNames.includes(p.userName)).filter(p => state.filter.title ? p.title.includes(state.filter.title) : true).filter(p => state.filter.favorite ? p.favorite : true);
}

export function changeSort (state: Draft<IItemsState>, { payload }:
	{
		payload: string;
		type: string;
	}) {
	state.sort = payload;
}

export function sort(state: Draft<IItemsState>)  {
	const sortCb = SORT_OPTIONS.filter((opt) => opt.name == state.sort)[0].cb;
	state.display = [...state.display].sort(sortCb);
}
