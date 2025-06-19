import { useEffect } from 'react';
import { Button, Col, Form, Row, Space } from 'antd';
import FormItems from "./FormItems";
const AdvancedSearchForm = ({ fields,onFinish,fieldsValue }) => {
  const [form] = Form.useForm();
fields.map(item => {
      if (item.type == "CheckboxAndTag") {
        Form.useWatch(item.name.toString(), form);
      }
    })
  const formStyle = {
    maxWidth: 'none',
    padding: 24,
  };


  const getFields = () => {
    const children = [];
    for (let i = 0; i < fields.length; i++) {
      children.push(
        <Col span={(fields[i].span > 3 ? 3 : fields[i].span)  * 8} key={i}>
          <FormItems fields={fields[i]} form={form} />
        </Col>,
      );
    }
    return children;
  };

  useEffect(() => {
    form.setFieldsValue(fieldsValue)
  },[fieldsValue])

  
  return (
    <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
      <Row gutter={24}>{getFields()}</Row>
      <div style={{ textAlign: 'right' }}>
        <Space size="small">
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            重置
          </Button>
        </Space>
      </div>
    </Form>
  );
};

export default AdvancedSearchForm;