import React,{useState} from 'react'
import { Form, Col, Table } from 'react-bootstrap';
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import { Edit, Inject } from '@syncfusion/ej2-react-grids';

const LeftTable = () => {
  const data =[
    {data: "Total Sales (VAT inclusive)"},
    {data: "Less: VAT"},
    {data: "Net"},
    {data: "Less: SC/PWD Discount"},
    {data: ""},
    {data: "Net"},
    {data: "Add-VAT"},
    {data: "Total Amount Collectibles"},
    {data: ""},
    {data: "Vatable Sales"},
    {data: "VAT Exempt Sales"},
    {data: "VAT Zero Rated Sales"},
    {data: "VAT Amount"},
    {data: "Vatable Sales"},
  ]
  const [editOptions, setEditOptions] = useState({ allowEditing: true, allowAdding: true, allowDeleting: true });
  return (
    <Col md={4} xs={12}>
        <hr className="my-2" />
        <p className="mb-2 ms-4"><strong>In settlement of the ff:</strong></p>
        <GridComponent dataSource={data} editSettings={editOptions}>
            <ColumnsDirective>
                  <ColumnDirective field='data' headerText='Invoice No.' width='200' textAlign="left"  />
                  <ColumnDirective field='amount' headerText='Amount' width='120' textAlign="center"/>
                </ColumnsDirective>
              <Inject services={[Edit]} />
          </GridComponent>
        {/* <Table className="w-100" bordered>
        <thead className="text-center">
          <tr>
            <th>Invoice No.</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Sales (VAT inclusive)</td>
            <td></td>
          </tr>
          <tr>
            <td>Less: VAT</td>
            <td></td>
          </tr>
          <tr>
            <td>Net</td>
            <td></td>
          </tr>
          <tr>
            <td>Less: SC/PWD Discount</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Net</td>
            <td></td>
          </tr>
          <tr>
            <td>Add-VAT</td>
            <td></td>
          </tr>
          <tr>
            <td>Total Amount Collectibles</td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Vatable Sales</td>
            <td></td>
          </tr>
          <tr>
            <td>VAT Exempt Sales</td>
            <td></td>
          </tr>
          <tr>
            <td>VAT Zero Rated Sales</td>
            <td></td>
          </tr>
          <tr>
            <td>VAT Amount</td>
            <td></td>
          </tr>
          <tr>
            <td>Total Sales</td>
            <td></td>
          </tr>
            
        </tbody>
      </Table> */}

      <p className="font">Form of Payment:</p>
      <div className="border-bottom border-top py-1">
        <Form.Group as={Col} controlId="formGridCompany">
            <Form.Check type="checkbox" label="Cash" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridCompany">
            <Form.Check type="checkbox" label="Check" />
        </Form.Group>
      </div>
    </Col>
  );
}
export default LeftTable;