import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../store';
import { selectPosts } from '../store/posts/selectors';
import { selectUsers } from '../store/users/selectors';
import { getPosts } from '../store/posts/actions';
import { deletePost, editPost } from '../store/posts/reducer';

import { Page } from './Page';
import { Post } from '../components/Post';
import { PerPageSelect } from '../components/Filters/PerPageSelect';
import { UserFilter } from '../components/Filters/UserFilter';
import { FavoriteFilter } from '../components/Filters/FavoriteFilter';
import { TitleSearch } from '../components/Filters/TitleSearch';
import { Btn } from '../components/Btn';
import { AddPostForm } from '../components/AddPostForm';
import { Pagination } from '../components/Pagination';
import { Sort } from '../components/Filters/Sort';
import { Filters } from '../components/Filters';
import { MultipleSelectionBar } from '../components/MultipleSelectionBar';

import { useItemsPerPage } from '../utils/hooks';
import { IItem } from '../utils/types';
import { updateDisplayItems } from '../utils/helpers';

export const PostsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, perPage, sort, filter } = useSelector(selectPosts);
  const display = updateDisplayItems({ data, sort, ...filter, page: 'posts' });
  const { data: users } = useSelector(selectUsers);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Array<number>>([]);
  const clearSelected = () => setSelected([]);

  const [isAddPost, setIsAddPost] = useState(false);

  useEffect(() => {
    if (!data.length && users.length) dispatch(getPosts(users));
  }, [users]);

  // display posts depending on page settings
  const itemsPerPage: Array<IItem> = useItemsPerPage(display, perPage, page);

  const items = itemsPerPage.map((post) => {
    const handleSelectItem = (checked: boolean) => {
      if (checked) {
        setSelected([...selected, post.id]);
      } else {
        setSelected(selected.filter((n) => n !== post.id));
      }
    };
    return <Post key={post.id} id={post.id} handleSelect={handleSelectItem} />;
  });

  const itemHandlers = {
    delete: deletePost,
    edit: editPost,
  };

  const handleAdding = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAddPost(true);
  };

  return (
    <Page title="Posts">
      <Filters>
        <TitleSearch />
        <UserFilter />
        <Sort />
        <FavoriteFilter />
        <PerPageSelect />
        <Btn text="Add post" handler={handleAdding} isActive />
      </Filters>

      {/* POSTS */}
      <section>
        <ul className="grid gap-4 items-stretch grid-cols-1 md:grid-cols-2 mt-5">{items}</ul>

        <Pagination currentP={page} perPage={perPage} length={display.length} setPage={setPage} />
      </section>

      {/* MODALS */}
      {isAddPost && <AddPostForm close={() => setIsAddPost(false)} />}

      <MultipleSelectionBar
        isActive={selected.length > 0}
        hasDel
        hasFav
        handlers={itemHandlers}
        selectedItems={selected}
        clearSelected={clearSelected}
      />
    </Page>
  );
};
