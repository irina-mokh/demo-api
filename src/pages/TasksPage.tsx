import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from 'app/store';
import { getTasks } from 'entities/task/model/actions';
import Page from './Page';
import { selectTasks } from 'entities/task/model/selectors';
import { deleteTask, editTask } from 'entities/task/model/reducer';

import { Task } from 'entities/task/ui/Task';
import { PerPageSelect } from 'widgets/filters/PerPageSelect';
import { Sort } from 'widgets/filters/Sort';
import { Filters } from 'widgets/filters';
import { MultipleSelectionBar } from '../features/multipleSelectionBar';
import { Pagination } from '../widgets/pagination/Pagination';
import { AddTaskForm } from '../features/addTaskForm';
import { Btn } from '../shared/ui/Btn';

import { useItemsPerPage } from '../shared/utils/hooks';
import { IItem } from '../shared/utils/types';
import { updateDisplayTasks } from '../shared/utils/helpers';

export const TasksPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, perPage, sort } = useSelector(selectTasks);
  const display = updateDisplayTasks({ data, sort });
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Array<number>>([]);

  const clearSelected = () => setSelected([]);

  const [isAddTask, setIsAddTask] = useState(false);

  useEffect(() => {
    if (!data.length) dispatch(getTasks());
  }, []);

  // display items depending on page settings
  const itemsPerPage: Array<IItem> = useItemsPerPage(display, perPage, page);

  const tasks = itemsPerPage.map((item) => {
    const handleSelectItem = (checked: boolean) => {
      if (checked) {
        setSelected([...selected, item.id]);
      } else {
        setSelected(selected.filter((n) => n !== item.id));
      }
    };
    return (
      <Task
        key={item.id}
        handleSelect={handleSelectItem}
        {...item}
        checked={selected.includes(item.id)}
      />
    );
  });

  const itemHandlers = {
    delete: deleteTask,
    edit: editTask,
  };

  const handleAdding = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAddTask(true);
  };
  return (
    <Page title="Tasks">
      <Filters>
        <Sort />
        <PerPageSelect />
        <Btn text="Add task" handler={handleAdding} />
      </Filters>

      <ul>{tasks}</ul>
      <Pagination currentP={page} perPage={perPage} length={display.length} setPage={setPage} />

      {/* MODALS */}
      {isAddTask && <AddTaskForm close={() => setIsAddTask(false)} />}
      <MultipleSelectionBar
        isActive={selected.length > 0}
        hasDel
        handlers={itemHandlers}
        selectedItems={selected}
        clearSelected={clearSelected}
      />
    </Page>
  );
};

export default TasksPage;
