import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from 'app/store';
import { selectPosts } from 'entities/post/model/selectors';
import { selectUsers } from 'entities/user/model/selectors';
import { getAllPostsWithUserNames } from 'entities/post/model/actions';
import { deletePost, editPost } from 'entities/post/model/reducer';

import Page from './Page';
import { UserFilter } from 'widgets/filters/UserFilter';
import { FavoriteFilter } from '../widgets/filters/FavoriteFilter';
import { TitleSearch } from 'widgets/filters/TitleSearch';
import { Btn } from '../shared/ui/Btn';
import { AddPostForm } from '../features/addPostForm';
import { Sort } from 'widgets/filters/Sort';
import { Filters } from 'widgets/filters';
import { MultipleSelectionBar } from '../features/multipleSelectionBar';

import { updateDisplayItems } from '../shared/utils/helpers';
import { PostWidget } from 'widgets/PostWidget';

const POSTS_PER_PAGE = 10;

const PostsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, sort, filter } = useSelector(selectPosts);
  const display = updateDisplayItems({ data, sort, ...filter, page: 'posts' });
  const [page, setPage] = useState(0);
  const { data: users } = useSelector(selectUsers);
  
  const [selected, setSelected] = useState<Array<number>>([]);
  const clearSelected = () => {
    setSelected([]);
  };

  const [isAddPost, setIsAddPost] = useState(false);

  useEffect(() => {
    if (!data.length && users.length) dispatch(getAllPostsWithUserNames(users));
  }, [users]);
  
  useEffect(() => {
    setPage(0);
  }, [filter]);
  const items = display.slice(0, (page + 1)*POSTS_PER_PAGE).map((post) => {
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

  const scrollHandler = (e: Event) => {
    // eslint-disable-next-line prettier/prettier
    const el = (e.target as Document).documentElement;
    if (el.scrollHeight - ( el.scrollTop + window.innerHeight) < 100) {
      setPage((p) => p + 1);
    }
  };
  // infinite scroll
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <Page title="Posts">
      <Filters>
        <TitleSearch />
        <UserFilter />
        <Sort />
        <FavoriteFilter />
        {/* <PerPageSelect /> */}
        <Btn text="Add post" handler={handleAdding} />
      </Filters>

      {/* POSTS */}
      <section>
        <ul className="grid gap-4 items-stretch grid-cols-1 md:grid-cols-2 mt-5">{items}</ul>
        {/* <Pagination currentP={page} perPage={perPage} length={display.length} setPage={setPage} /> */}
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
