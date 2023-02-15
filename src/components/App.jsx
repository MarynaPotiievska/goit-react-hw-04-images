import { useState, useEffect } from 'react';
import { fetchImages } from './api';
import { AppWrapper, Message } from './App.styled';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Modal from './Modal';

import Searchbar from './Searchbar';

export const App = () => {
  const [images, setImages] = useState([]);
  const [request, setRequest] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('Please, enter your request');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');

  const handleSubmit = request => {
    setImages([]);
    setPage(1);
    setRequest(request);
  };

  const handleClick = () => {
    setPage(page + 1);
  };

  const handleModalToggle = largeImageUrl => {
    setIsModalOpen(!isModalOpen);
    setLargeImageUrl(largeImageUrl);
  };

  useEffect(() => {
    async function fetchImagesByRequest() {
      try {
        setIsLoading(true);
        const resp = await fetchImages(request, page);
        const { totalHits, hits } = resp;
        if (hits.length === 0) {
          setMessage(
            'Sorry, there are no photos for you request. Please, try another one.'
          );
        }
        setImages([...images, ...hits]);
        setTotalHits(totalHits);
      } catch (error) {
        setError('Sorry, something went wrong. Please, try again.');
      } finally {
        setIsLoading(false);
      }
    }

    if (!request) {
      return;
    } else {
      fetchImagesByRequest();
    }
  }, [request, page]);

  const calcIsLastPage = images.length / totalHits;

  return (
    <AppWrapper>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} modalToggle={handleModalToggle} />
      {calcIsLastPage < 1 && !isLoading && <Button onClick={handleClick} />}
      {isModalOpen && (
        <Modal largeImageUrl={largeImageUrl} modalToggle={handleModalToggle} />
      )}
      {isLoading && <Loader />}
      {error !== null && <Message>{error}</Message>}
      {error === null && images.length === 0 && <Message>{message}</Message>}
    </AppWrapper>
  );
};
