import { Button, Form, Input, InputNumber, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from 'store';
import { editProduct, toggleEditModal } from 'store/products';
import { IProduct } from 'interfaces/product';

export type FormValues = {
  name: string;
  decription: string;
  type: string;
  price: number;
};

interface PageProps {
  currentProduct: IProduct | null;
}

const EditProductModal = ({ currentProduct }: PageProps) => {
  const [formEdit] = Form.useForm();
  const { openEditModal } = useSelector((store: TRootState) => store.products);
  const dispatch = useDispatch();

  const handleCancel = () => {
    formEdit.resetFields();
    dispatch(toggleEditModal(false));
  };

  const onSubmit = (values: FormValues) => {
    formEdit.resetFields();
    const newObject: IProduct = {
      id: currentProduct?.id ?? '',
      qty: currentProduct?.qty ?? 1,
      imgPath: currentProduct?.imgPath ?? '',
      name: values.name,
      decription: values.decription,
      type: values.type,
      price: values.price,
    };
    dispatch(editProduct(newObject));
    handleCancel();
  };

  const handleOk = () => {
    handleCancel();
  };

  return (
    <div>
      <Modal title="Edit Product" open={openEditModal} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form
          form={formEdit}
          name="basic"
          labelCol={{ span: 24 }}
          initialValues={{
            name: currentProduct ? currentProduct.name : '',
            decription: currentProduct ? currentProduct.decription : '',
            type: currentProduct ? currentProduct.type : '',
            price: currentProduct ? currentProduct.price : '',
          }}
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
                disabled={!!formEdit.getFieldsError().filter(({ errors }) => errors.length).length}
              >
                Edit
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditProductModal;
