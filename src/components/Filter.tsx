import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { setPostsPerPage } from '../store/posts/reducer';
import { selectPosts } from '../store/posts/selectors';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PER_PAGE_OPTIONS = [10, 20, 50, 100, 'all'];

export const Filter = () => {};
