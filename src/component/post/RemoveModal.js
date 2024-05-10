import React from 'react';
import Modal from '../../common/Modal';
const RemoveModal = (props) => {
    const {visible,onCancel,onConfirm} = props
    return (
        <Modal visible={visible} 
        title="포스트삭제"
        description="포스트를 정말 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={onConfirm}
        onCancel={onCancel}
        />
    );
};

export default RemoveModal;