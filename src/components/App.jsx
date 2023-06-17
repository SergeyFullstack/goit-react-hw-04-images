import React, { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from 'api/fetch-api-gallery';
import { Loader } from './Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export function App() {
  const [searchName, setSearchName] = useState('');
  const [dataImages, setDataImages] = useState([]);
  const [page, setPage] = useState(1);
  const [toggleLoader, setToggleLoader] = useState(false);
  const [toggleButton, setToggleButton] = useState(true);
  const [toggleModal, setToggleModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [largeImageAlt, setLargeImageAlt] = useState('');

 useEffect(() => {
    if (!searchName) return;
    setToggleLoader(true);

    const getGallery = () => {
      fetchImages(searchName, page)
        .then(images => {
          if (Math.ceil(images.total / 12) <= page) {
            setToggleButton(false);
          } else {
            setToggleButton(true);
          }

          setDataImages(prevImages => {
            return [...prevImages, ...images.hits];
          });
        })
       .catch(error => console.log(error))
        .finally(() => {
          setToggleLoader(false);
        });
    }

    getGallery();
  }, [page, searchName, setDataImages]);

  const onSubmitSearch = (searchName) => {
    setSearchName(searchName);
    setDataImages([]);
    setPage(1);
  };

  const clickLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setToggleLoader(true);
  };

  const modalOpen = (currentImage) => {
    setLargeImageUrl(currentImage.largeImageURL);
    setLargeImageAlt(currentImage.tags);
    setToggleModal(true);
  };

  const closeModal = () => {
    setLargeImageUrl('');
    setLargeImageAlt('');
    setToggleModal(false);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmitSearch} />
      {toggleLoader && <Loader widthLoader={'200'} heightLoader={'200'} />}
      <ImageGallery
        dataImages={dataImages}
        toggleButton={toggleButton}
        toggleLoader={toggleLoader}
        clickLoadMore={clickLoadMore}
        modalOpen={modalOpen}
      />
      {toggleModal && (
        <Modal url={largeImageUrl} alt={largeImageAlt} closeModal={closeModal} />
      )}
    </>
  );
}
































































// import { Component } from 'react';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Searchbar } from './Searchbar/Searchbar';
// import { fetchImages } from 'api/fetch-api-gallery';
// import { Loader } from './Loader/Loader';
// import { Modal } from 'components/Modal/Modal';

// export class App extends Component {
//   state = {
//     searchName: '',
//     dataImages: [],
//     page: 1,
//     toggleLoader: false,
//     toggleButton: true,
//     toggleModal: false,
//     largeImageUrl: '',
//     largeImageAlt: '',
//   };

//   componentDidUpdate(_, prevState) {
//     const { searchName, page } = this.state;

//     if (prevState.searchName !== searchName || prevState.page !== page) {
//       this.getGallery();
//     }
//   }

//   onSubmitSearch = searchName => {
//     this.setState({
//       searchName,
//       dataImages: [],
//       page: 1,
//     });
//   };

//   getGallery = () => {
//     const { searchName, page, dataImages } = this.state;

//     this.setState({
//       toggleLoader: true,
//       toggleButton: false,
//     });

//     fetchImages(searchName, page)
//       .then(images => {
//         if (images.hits.length === 0) return;

//         const newDataImages = [...dataImages, ...images.hits];

//         this.setState({
//           dataImages: newDataImages,
//           toggleButton: Math.ceil(images.total / 12) <= page ? false : true,
//         });
//       })
//       .catch(error => console.log(error))
//       .finally(() => {
//         this.setState({ toggleLoader: false });
//       });
//   };

//   clickLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//       toggleLoader: true,
//     }));
//   };

//   modalOpen = curentImage => {
//     this.setState({
//       largeImageUrl: curentImage.largeImageURL,
//       largeImageAlt: curentImage.tags,
//       toggleModal: true,
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       largeImageUrl: '',
//       largeImageAlt: '',
//       toggleModal: false,
//     });
//   };

//   render() {
//     const {
//       dataImages,
//       toggleLoader,
//       toggleButton,
//       toggleModal,
//       largeImageUrl,
//       largeImageAlt,
//     } = this.state;

//     return (
//       <>
//         <Searchbar onSubmit={this.onSubmitSearch} />
//         {toggleLoader && <Loader widthLoader={'200'} heightLoader={'200'} />}
//         <ImageGallery
//           dataImages={dataImages}
//           toggleButton={toggleButton}
//           toggleLoader={toggleLoader}
//           clickLoadMore={this.clickLoadMore}
//           modalOpen={this.modalOpen}
//         />
//         {toggleModal && (
//           <Modal
//             url={largeImageUrl}
//             alt={largeImageAlt}
//             closeModal={this.closeModal}
//           />
//         )}
//       </>
//     );
//   }
// }
