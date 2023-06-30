import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '../store';
import { getPhotos } from '../store/albums/actions';
import { selectAlbums } from '../store/albums/selectors';

import { Page } from './Page';
import { Photo } from '../components/Photo';

export const PhotosPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { photos } = useSelector(selectAlbums);

  const id = useParams().id || 0;
  useEffect(() => {
    dispatch(getPhotos(+id));
  });

  const thumbs = photos.map((photo) => <Photo key={photo.id} {...photo} />);
  return (
    <Page title="Album">
      <section>
        <h3>Album</h3>
        <ul className="flex flex-wrap gap-2">{thumbs}</ul>
      </section>
    </Page>
  );
};
