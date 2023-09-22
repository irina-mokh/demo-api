import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from 'app/store';
import { getPhotos } from 'entities/album/model/actions';
import { selectAlbums } from 'entities/album/model/selectors';

import Page from './Page';
import { Photo } from '../entities/photo/ui/Photo';
import { IPhoto } from 'shared/utils/types';

const PhotosPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { photos } = useSelector(selectAlbums);

  const id = useParams().id || 0;
  useEffect(() => {
    dispatch(getPhotos(+id));
  });

  const thumbs = photos.map((photo: IPhoto) => <Photo key={photo.id} {...photo} />);
  return (
    <Page title="Album">
      <section>
        <h3>Album</h3>
        <ul className="flex flex-wrap gap-2">{thumbs}</ul>
      </section>
    </Page>
  );
};
export default PhotosPage;
