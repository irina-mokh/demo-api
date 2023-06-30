import { useParams } from 'react-router-dom';
import { Page } from './Page';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from '../store';
import { getPhotos } from '../store/albums/actions';
import { selectAlbums } from '../store/albums/selectors';
import { Photo } from '../components/Photo';

export const PhotosPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { photos } = useSelector(selectAlbums);

  const id = useParams().id || 0;
  useEffect(() => {
    dispatch(getPhotos(+id));
  });

  const thumbs = photos.map((photo) => <Photo {...photo} />);
  return (
    <Page title="Album">
      <section>
        <h3>Album</h3>
        <ul className="flex flex-wrap gap-2">{thumbs}</ul>
      </section>
    </Page>
  );
};
