import { Button, Form, Input, InputNumber, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from 'store';
import { addProduct, toggleModal } from 'store/products';
import { nanoid } from '@reduxjs/toolkit';

export type FormValues = {
  name: string;
  decription: string;
  type: string;
  price: number;
};

const AddProductModal = () => {
  const [form] = Form.useForm();
  const { openModal } = useSelector((store: TRootState) => store.products);
  const dispatch = useDispatch();

  const handleCancel = () => {
    form.resetFields();
    dispatch(toggleModal(false));
  };

  const onSubmit = (values: FormValues) => {
    form.resetFields();
    const newObject = { ...values, id: nanoid(), qty: 1, imgPath: '' };
    dispatch(addProduct(newObject));
    handleCancel();
  };

  const handleOk = () => {
    handleCancel();
  };

  return (
    <div>
      <Modal title="Add Product" open={openModal} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onSubmit}
          autoComplete="off"
          className="mt-16 w-100"
        >
          <Form.Item<FormValues>
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Field is required', min: 3, type: 'string' }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item<FormValues>
            label="Description"
            name="decription"
            rules={[{ required: true, message: 'Field is required', min: 6, type: 'string' }]}
          >
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item<FormValues>
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Field is required', type: 'string' }]}
          >
            <Input placeholder="Type" />
          </Form.Item>
          <Form.Item<FormValues> label="Price" name="price" rules={[{ required: true, message: 'Field is required' }]}>
            <InputNumber className="w-100" placeholder="Price" type="number" />
          </Form.Item>
          <Form.Item shouldUpdate style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 0 }}>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                className="mt-16"
                disabled={
                  !!form.getFieldsError().filter(({ errors }) => errors.length).length || !form.isFieldsTouched(true)
                }
              >
                Add
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddProductModal;
