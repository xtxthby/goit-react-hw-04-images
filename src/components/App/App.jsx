


import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Button from 'components/Button';
import { ToastWrapper } from 'components/ToastContainer/ToastContainer';
import { getImages } from 'services/getImages';
import { StyledApp } from './App.styled';

function App() {
  // це замість стейту
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [status, setStatus] = useState('idle');
  const [notification, setNotification] = useState({ type: '', message: '' });

  useEffect(() => {
    // якщо нічого не введено то виходимо
    if (!query) {
      return;
    }
    async function addImages() {
      // очікування від бекенду на загрузку
      setStatus('pending');

      try {
        // при загрузці витягуємо картинки і загальну кількість
        const { images, totalImages } = await getImages(query, page);
        // якщо прийшло 0 то виводимо помилку, ми ввели те що не відповідає назві
        if (images.length === 0) {
          setNotification({
            type: 'error',
            message:
              'Sorry, there are no images matching your search query. Please try again.',
          });
        }
        // якщо картинки є і їх кількість дорівнює набору
        // виводимо загальну кількість
        if (images.length !== 0 && page === 1) {
          setNotification({
            // успіх
            type: 'success',
            message: `We found ${totalImages} images.`,
          });
        }
        // розпилюємо попередні , а потім нові
        setImages(prevState => [...prevState, ...images]);
        // змінюємо статус - типа завантажено
        setStatus('resolved');
        // змінюємо стейт на загальну кількість
        setTotalImages(totalImages);
      } catch (error) {
        console.log(error.message);
        setNotification({
          type: 'error',
          message: 'There are some problems! Try again later.',
        });
        setStatus('rejected');
      }
    }
    addImages();
    // ставимо залежності від яких буде змінюватись useEffect
  }, [query, page]);
  

  
  // componentDidUpdate(_, prevState) {
  //   const { query, page, notification } = this.state;
  //   const { addImages, handleNotification } = this;

  //   if (prevState.query !== query || prevState.page !== page) {
  //     addImages();
  //   }

  //   if (prevState.error !== notification && notification) {
  //     handleNotification();
  //   }
  // }

  useEffect(() => {
    if (notification) {
      function handleNotification() {
        const notificationType = notification.type;
        const notificationMessage = notification.message;

        if (notificationType === 'info') {
          toast.info(notificationMessage);
          setNotification({
            type: '', message: ''
          });
        }
        if (notificationType === 'error') {
          toast.error(notificationMessage);
          setNotification({
            type: '', message: ''
          });
        }
        if (notificationType === 'success') {
          toast.success(notificationMessage);
          setNotification({
            type: '', message: ''
          });
        }
      }
      handleNotification();
    };
     // ставимо залежності від яких буде змінюватись useEffect
  }, [notification]);



  const handleSearch = value => {
    // якщо в інпуті нічого не ввели слово
    if (!value) {
      setNotification({
        type: 'info',
        message: 'Please enter your search query!',
      });
      return;
    }

    if (value === query) {
      setNotification({
        type: 'info',
        message:
        'You are seeing the images by this query. Please, change your query.',
      });
      return;
    }
    setQuery(value);
    setImages([]);
    setPage(1);
    setNotification({
      type: '',
      message: '',
    });
    setStatus('idle');

    // this.setState({
    //   query: value,
    //   images: [],
    //   page: 1,
    //   notification: {
    //     type: '',
    //     message: '',
    //   },
    //   status: 'idle',
    // });
  };



  const onLoadMore = () => {
    setPage( page + 1);
  };

  return (
    <StyledApp>
      <Searchbar onSubmit={handleSearch} />

      {status === 'pending' && <Loader/>}

      {(status === 'resolved' || (status === 'pending' && page !== 1)) && (
        <ImageGallery images={images} />
      )}

      {((totalImages !== images.length && status === 'resolved') ||
        (status === 'pending' && page > 1)) && (
        <Button onClick={onLoadMore} />
      )}

      <ToastWrapper/>
    </StyledApp>
  );
  
}

export default App;





// import { Component } from 'react';

// export default class App extends Component {
//   state = {
//     tags: null
//   }
//   componentDidMount() {
//     fetch('https://pixabay.com/api/?key=34460710-325a6b1cd40117d9873f8efc0&image_type=photo&orientation=horizontal&page=1&per_page=12&q=dog')
//       .then(res => res.json()).then(tags => this.setState({tags}));
//   }
//   render() {
//     return (
//       <div>
//         {this.state.tags && <div>dog</div>}
//       </div>
//     );
//   }
// }