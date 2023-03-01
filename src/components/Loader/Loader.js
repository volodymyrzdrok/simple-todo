import React from 'react';
import PropTypes from 'prop-types';
import { Puff } from 'react-loader-spinner';

const Loader = ({ colorLoader = '#fff' }) => {
  return (
    <div style={{ position: 'absolute' }}>
      <Puff
        height="40"
        width="40"
        color={colorLoader}
        secondaryColor={colorLoader}
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

Loader.propTypes = {
  colorLoader: PropTypes.string,
};

export default Loader;
