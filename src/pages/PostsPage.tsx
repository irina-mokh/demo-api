import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../store';
import { selectPosts } from '../store/posts/selectors';
import { selectUsers } from '../store/users/selectors';
import { getPosts } from '../store/posts/actions';
import { getUsers } from '../store/users/actions';
import {
  changeSortType,
  deletePost,
  editPost,
  filterPosts,
  sortPosts,
} from '../store/posts/reducer';

import { Page } from './Page';
import { Post } from '../components/Post';
import { PerPageSelect } from '../components/PerPageSelect';
import { UserFilter } from '../components/Filters/UserFilter';
import { FavoriteFilter } from '../components/Filters/FavoriteFilter';
import { TitleSearch } from '../components/Filters/TitleSearch';
import { Select } from '../components/Select';
import { Btn } from '../components/Btn';
import { AddPostForm } from '../components/AddPostForm';
import { ConfirmDialog } from '../components/ConfirmDialog';

import { POST_SORT_OPTIONS } from '../utils';

export const PostsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, perPage, display, filter, sort } = useSelector(selectPosts);
  const { data: users } = useSelector(selectUsers);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Array<number>>([]);

  const [isAddForm, setIsAddForm] = useState(false);
  const [confirmDialogDel, setConfirmDialogDel] = useState(false);
  const [confirmDialogFav, setConfirmDialogFav] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (!data.length) {
      dispatch(getPosts(users));
    }
  }, [users]);

  // filter posts
  useEffect(() => {
    dispatch(filterPosts());
  }, [filter, data]);

  // sort posts
  useEffect(() => {
    dispatch(sortPosts());
  }, [sort, filter, data]);

  // display post depending on page settings
  let postsPerPage = display;
  if (perPage !== 'all') {
    postsPerPage = display.slice(page * +perPage, +perPage * (page + 1));
  }

  const postElems = postsPerPage.map((post) => {
    const handleSelectPost = (checked: boolean) => {
      if (checked) {
        setSelected([...selected, post.id]);
      } else {
        setSelected(selected.filter((n) => n !== post.id));
      }
    };
    return <Post key={post.id} id={post.id} handleSelect={handleSelectPost} />;
  });

  // sort
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeSortType(e.target.value));
  };

  const sortOptions = POST_SORT_OPTIONS.map((opt) => (
    <option key={opt.name} value={String(opt.name)}>
      {opt.name}
    </option>
  ));

  const multipleDeleting = () => {
    selected.forEach((id) => {
      dispatch(deletePost(id));
    });
    setConfirmDialogDel(false);
    setSelected([]);
  };

  const multipleAddingToFav = () => {
    selected.forEach((id) => {
      const newPost = data.filter((post) => post.id === id)[0];
      dispatch(editPost({ ...newPost, favorite: true }));
    });
    setConfirmDialogFav(false);
    setSelected([]);
  };

  return (
    <Page title="Posts">
      <form className="rounded-md bg-gray-900 bg-opacity-40 text-gray-400 px-4 py-2">
        <legend className="visually-hidden text-lg">Filters:</legend>
        <fieldset className="flex justify-between flex-wrap py-1">
          <TitleSearch />
          <UserFilter />
          <Select handler={handleSortChange} value={sort} label="Sort by:" options={sortOptions} />
          <FavoriteFilter />
          <PerPageSelect />
        </fieldset>
      </form>
      <div className="flex justify-end mt-2">
        <Btn text="Add post" handler={() => setIsAddForm(true)} />
      </div>
      <section>
        <ul className="grid gap-4 items-stretch grid-cols-1 md:grid-cols-2 mt-5">{postElems}</ul>
      </section>
      {isAddForm && <AddPostForm close={() => setIsAddForm(false)} />}
      {selected.length && (
        <div className="bar fixed bottom-2 right-2 rounded-md min-w-[40%] flex justify-between items-center bg-gray-700 border-2 border-teal-400 shadow-2xl p-3 m-auto child:mx-2">
          <p>For all checked items:</p>
          <Btn text="Add to favorite" handler={() => setConfirmDialogFav(true)} />
          <Btn text="Delete" handler={() => setConfirmDialogDel(true)} />
        </div>
      )}
      {confirmDialogDel && (
        <ConfirmDialog
          text="Delete posts?"
          close={() => setConfirmDialogDel(false)}
          confirm={multipleDeleting}
        />
      )}
      {confirmDialogFav && (
        <ConfirmDialog
          text="Add posts to favorite?"
          close={() => setConfirmDialogFav(false)}
          confirm={multipleAddingToFav}
        />
      )}
    </Page>
  );
};
