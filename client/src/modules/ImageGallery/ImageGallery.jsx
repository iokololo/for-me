import React from "react";
import cl from "./ImageGallery.module.css";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

export const ImageGallery = ({ images, id, video }) => {
  const [isVideo, setIsVideo] = React.useState(false);
  const navigate = useNavigate();

  if (!images) {
    return (
      <div className={cl.root}>
        <Skeleton className={cl.mainImageSkeleton} />
        <div className={cl.flex}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={`${index} gallery skeleton`}
              className={cl.miniSkeleton}
            />
          ))}
        </div>
      </div>
    );
  }

  if (images)
    return (
      <div className={cl.root}>
        <div
          className={cl.mainImage}
          onClick={() => navigate(`/product/${id}/gallery`)}
        > 
        {video ? <video
          src={video}
        >
          </video>
          
        :
          <img
          src={images ? images[0] : null}
          onError={(e) => {
            setIsVideo(true);
            e.target.onerror = null;
          }}
          
          />
        }
          </div>
          
        <div className={cl.otherImages}>
          {images?.length === 1 ? (
            <div className={cl.twoImages}>
              {images?.map((image, index) => {
                if (index > 0)
                  return (
                    <div
                      onClick={() => navigate(`/product/${id}/gallery`)}
                      className={cl.twoImage}
                      key={`${image}-${index}-gallery`}
                    >
                      <img
                        src={image}
                        alt='other'
                        
                      />
                    </div>
                  );
              })}
            </div>
          ) : images?.length === 3 || images?.length === 2 ? (
            <div className={cl.twoImages}>
              {images?.map((image, index) => {
                if (index > 0)
                  return (
                    <div
                      onClick={() => navigate(`/product/${id}/gallery`)}
                      className={cl.twoImage}
                      key={`${image}-${index}-gallery`}
                    >
                      <img
                        src={image}
                        alt='other'
                      />
                    </div>
                  );
              })}
            </div>
          ) : images?.length === 4 ? (
            <div className={cl.threeImages}>
              <div
                onClick={() => navigate(`/product/${id}/gallery`)}
                className={`${cl.threeImage} ${cl.threeFirst}`}
                key={`${images[1]}--gallery`}
              >
                <img
                  src={images[1]}
                  alt='other'
                />
              </div>
              <div
                onClick={() => navigate(`/product/${id}/gallery`)}
                className={`${cl.threeImage} ${cl.threeFirst}`}
                key={`${images[2]}--gallery`}
              >
                <img
                  src={images[2]}
                  alt='other'
                />
              </div>
              <div
                onClick={() => navigate(`/product/${id}/gallery`)}
                className={`${cl.threeImage} ${cl.threeSeconde}`}
                key={`${images[3]}--gallery`}
              >
                <img
                  src={images[3]}
                  alt='other'
                />
              </div>
            </div>
          ) : images?.length === 5 ? (
            <div className={cl.fourImages}>
              {images?.map((image, index) => {
                if (index > 0)
                  return (
                    <div
                      onClick={() => navigate(`/product/${id}/gallery`)}
                      className={cl.fourImage}
                      key={`${image}-${index}-gallery`}
                    >
                      <img
                        src={image}
                        alt='other'
                      />
                    </div>
                  );
              })}
            </div>
          ) : (
            <div className={cl.fourImages} style={{ position: "relative" }}>
              {images?.map((image, index) => {
                if (index > 0 && index < 5)
                  return (
                    <div
                      className={cl.fourImage}
                      onClick={() => navigate(`/product/${id}/gallery`)}
                      key={`${image}-${index}-gallery`}
                    >
                      <img
                        src={image}
                        alt='other'
                      />
                    </div>
                  );
              })}
              {/* Add the overlay after the images */}
              <div
                onClick={() => navigate(`/product/${id}/gallery`)}
                className={cl.overlay}
              >
                +{images?.length - 5}
              </div>
            </div>
          )}
        </div>
      </div>
    );
};
