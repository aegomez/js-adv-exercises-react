import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GridList } from '@material-ui/core';
import PropTypes from 'prop-types';

import Image from './Image';
import { fetchData } from './state';

function Gallery({ page: { id, images, page, total } }) {
  const imageSize = 180;
  // const container = useRef(null);
  // let [cols, setCols] = useState(0);

  // useEffect(() => {
  //   setCols(Math.ceil(container.current.width / imageSize));
  // });

  return (
    <>
      <div ref={container}>
        <GridList cellHeight={imageSize} cols={cols}>
          {images.map((image, idx) => (
            <Image key={idx} />
          ))}
        </GridList>
      </div>
    </>
  );
}
