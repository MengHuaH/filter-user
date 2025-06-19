import { Form, Input, Checkbox, Tag, Flex } from 'antd';

const FormItems = ({ fields, form }) => {
    const clearSelection = () => {
        form.setFieldValue(fields.name.toString(), undefined);
    };
    const renderTags = () => {
        if (form.getFieldValue(fields.name.toString()) === undefined || form.getFieldValue(fields.name.toString()).length == 0) return null;

        return (
            <Flex justify="flex-start" align="center" wrap gap={4} style={{ marginBottom: 8 }}>
                {fields.options
                    .filter(option => form.getFieldValue(fields.name.toString()).includes(option.value))
                    .map(option => (
                        <Tag key={option.value}>{option.label}</Tag>
                    ))}
                <a href="#" onClick={clearSelection} style={{ marginLeft: 8 }}>清空</a>
            </Flex>
        );
    };

    switch (fields.type) {
        case "CheckboxAndTag":
            return (<div>
                {renderTags()}
                <Form.Item
                    name={fields.name}
                    label={<h4>{fields.label}</h4>}
                    rules={fields.rules}
                >
                    <Checkbox.Group
                        options={fields.options}
                    />
                </Form.Item>
            </div>

            );
        default:
            return (
                <Form.Item
                    name={fields.name}
                    label={<h4>{fields.label}</h4>}
                    rules={fields.rules}
                >
                    <Input />
                </Form.Item>
            );
    }
}

export default FormItems