import { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  margin-top: 50px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const GalleryItem = ({ image, index, moveImage }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'IMAGE',
    item: { id: image.id, index },
  });

  const [, drop] = useDrop({
    accept: 'IMAGE',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      className={`gallery-item ${isDragging ? 'dragging' : ''}`}
      ref={(node) => drag(drop(node))}
    >
      <img src={image.src} alt={`Item ${image.id}`} />
      <div className="tags">
        {image.tags.map((tag, tagIndex) => (
          <span key={tag} className="tag">
            {tagIndex > 0 && ' '}
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

// Define prop types for GalleryItem
GalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  moveImage: PropTypes.func.isRequired,
};

const Gallery = ({ imageData }) => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setImages(imageData);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [imageData]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const moveImage = (dragIndex, hoverIndex) => {
    const updatedImages = [...images];
    const draggedImage = updatedImages[dragIndex];

    updatedImages.splice(dragIndex, 1);
    updatedImages.splice(hoverIndex, 0, draggedImage);

    setImages(updatedImages);
  };

  return (
    <div>
      <h1 className="headerText">Image Gallery</h1>
      <input
        type="text"
        placeholder="Search by tag"
        value={searchQuery}
        onChange={handleSearch}
      />
      {loading ? (
        <Spinner />
      ) : (
        <div className="gallery-grid">
          {images
            .filter((image) =>
              image.tags.some((tag) => tag.includes(searchQuery.toLowerCase()))
            )
            .map((image, index) => (
              <GalleryItem
                key={image.id}
                image={image}
                index={index}
                moveImage={moveImage}
              />
            ))}
        </div>
      )}
    </div>
  );
};

// Define prop types for Gallery
Gallery.propTypes = {
  imageData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default Gallery;

