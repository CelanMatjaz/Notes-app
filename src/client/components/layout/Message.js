import React from 'react';

const Message = ({ type, message }) => {
    return (
        <div className={'message ' + type || 'success'}>
            <b>{message || '(The \'message\' prop is not passed into this component)'}</b>
        </div>
    );
};

export default Message;