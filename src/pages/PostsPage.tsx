import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from 'app/store';
import { selectPosts } from 'entities/post/model/selectors';
import { selectUsers } from 'entities/user/model/selectors';
import { getPosts } from 'entities/post/model/actions';
import { deletePost, editPost } from 'entities/post/model/reducer';

import Page from './Page';
import { Post } from '../entities/post/ui/Post';
import { PerPageSelect } from '../widgets/filters/PerPageSelect';
import { UserFilter } from 'widgets/filters/UserFilter';
import { FavoriteFilter } from '../widgets/filters/FavoriteFilter';
import { TitleSearch } from 'widgets/filters/TitleSearch';
import { Btn } from '../shared/ui/Btn';
import { AddPostForm } from '../features/addPostForm';
import { Pagination } from '../widgets/pagination/Pagination';
import { Sort } from 'widgets/filters/Sort';
import { Filters } from 'widgets/filters';
import { MultipleSelectionBar } from '../features/multipleSelectionBar';

import { useItemsPerPage } from '../utils/hooks';
import { IItem } from '../utils/types';
import { updateDisplayItems } from '../utils/helpers';
import { PostWidget } from 'widgets/PostWidget';

const PostsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, perPage, sort, filter } = useSelector(selectPosts);
  const display = updateDisplayItems({ data, sort, ...filter, page: 'posts' });
  const { data: users } = useSelector(selectUsers);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Array<number>>([]);
  const clearSelected = () => {
    setSelected([]);
  };

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
    return (
      <PostWidget
        key={post.id}
        id={post.id}
        handleSelect={handleSelectItem}
        checked={selected.includes(post.id)}
      />
    );
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
        <Btn text="Add post" handler={handleAdding} />
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

export default PostsPage;
