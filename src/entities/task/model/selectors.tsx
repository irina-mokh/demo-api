import { RootState } from 'shared/utils/types';

export const selectTasks = (state: RootState) => state.tasks;
