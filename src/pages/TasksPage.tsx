import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../store';
import { getTasks } from '../store/tasks/actions';
import { Page } from './Page';
import { selectTasks } from '../store/tasks/selectors';
import { deleteTask, editTask } from '../store/tasks/reducer';

import { Task } from '../components/Task';
import { PerPageSelect } from '../components/Filters/PerPageSelect';
import { Sort } from '../components/Filters/Sort';
import { Filters } from '../components/Filters';
import { MultipleSelectionBar } from '../components/MultipleSelectionBar';
import { Pagination } from '../components/Pagination';
import { AddTaskForm } from '../components/AddTaskForm';
import { Btn } from '../components/Btn';

import { useItemsPerPage } from '../utils/hooks';
import { IItem } from '../utils/types';
import { updateDisplayTasks } from '../utils/helpers';

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
    return <Task key={item.id} handleSelect={handleSelectItem} {...item} />;
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
        <Btn text="Add task" handler={handleAdding} isActive />
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
