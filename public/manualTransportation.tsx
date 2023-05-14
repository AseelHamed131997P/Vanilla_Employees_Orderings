import { FunctionComponent } from "react";
import {
  Row,
  Col,
  ManualFields,
  DropDownFields,
  Button,
  Icon,
} from "ui/components";
import { general } from "data";
import Icons from "ui/components/icons";
import { styled, css, mq } from "ui/utils";
const Title1 = styled.h2(
  ({ theme: { colors } }) => css`
    color: #0a2f5a;
    font-weight: bold;
    font-size: small;
    position: relative;
    top: 27px;
    right: 35px;
  `
);
const Title2 = styled.h2(
  ({ theme: { colors } }) => css`
    color: #988d8d;
    font-weight: bold;
    font-size: small;
    position: relative;
    top: 27px;
    right: 35px;
  `
);
const StyledButton = styled(Button)(
  () => css`
    position: relative;
    top: 0;
    bottom: 10px;
    left: 780px;
    padding: 1rem;
  `
);

const Line = styled.div(
  () => css`
    border-left: 1px solid #70707070;
    height: 400px;
    position: absolute;
    left: 43%;
    margin-left: -3px;
    top: 100px;
  `
);
const Title = styled.h2(
  () => css`
    color: #0a2f5a;
    font-weight: bold;
    position: relative;
    top: 15px;
    font-size: larger;
    bottom: 20px;
    left: 0px;
  `
);

const ManualTransportation: FunctionComponent = () => {
  return (
    <Row width={1} marginLeft={"120px"}>
      <Col width={0.52}>
        <Col height={"30px"}>
          <Title>{general.manualFields.manualTransp}</Title>
        </Col>
        <DropDownFields
          placeHolder={general.manualFields.selectSupplier}
          fieldName={general.manualFields.supplier}
          height={"50px"}
        ></DropDownFields>
        <DropDownFields
          placeHolder={general.manualFields.selectCustomer}
          fieldName={general.manualFields.customer}
          height={"50px"}
        ></DropDownFields>
        <ManualFields
          fieldName={general.manualFields.quantity}
          placeHolder={"1"}
          height={"50px"}
        ></ManualFields>
        <ManualFields
          fieldName={general.manualFields.sale}
          placeHolder={general.manualFields.sale}
          height={"50px"}
        ></ManualFields>
        <ManualFields
          fieldName={general.manualFields.purchase}
          placeHolder={general.manualFields.purchase}
          height={"50px"}
        ></ManualFields>
      </Col>

      <Line></Line>

      <Col width={0.48} marginLeft={"-120px"}>
        <Row width={1} height={"120px"} marginTop={"50px"}>
          <Col width={1.5 / 10}>
            <Icon.USD />
          </Col>
          <Col width={1 / 10}>
            <Title1>{general.manualFields.Currancy}</Title1>
            <Title2>{general.manualFields.USD}</Title2>
          </Col>
          <Col width={1.6 / 10}>
            <Icon.Tax />
          </Col>
          <Col width={1.2 / 9}>
            <Title1>{general.manualFields.Tax} </Title1>
            <Title2>{general.manualFields.E}</Title2>
          </Col>
          <Col width={1.6 / 10}>
            <Icon.Date />
          </Col>
          <Col width={1 / 10}>
            <Title1>{general.manualFields.Date}</Title1>
            <Title2>{general.manualFields["10/7/2021"]}</Title2>
          </Col>
        </Row>
        <Row width={1} height={"120px"} marginLeft={"-50px"}>
          <Col width={1.3 / 10} marginTop={"25px"}>
            <Icon.Description />
          </Col>
          <Col width={1 / 10}>
            <Title1>{general.manualFields.Description}</Title1>
            <Title2>{general.manualFields.Ticket}</Title2>
          </Col>
          <Col width={1.3 / 10} marginTop={"25px"}>
            <Icon.Item />
          </Col>
          <Col width={1 / 10}>
            <Title1>{general.manualFields.Item}</Title1>
            <Title2>000000001</Title2>
          </Col>
          <Col width={1.3 / 10} marginTop={"25px"}>
            <Icon.Unit />
          </Col>
          <Col width={1 / 10}>
            <Title1>{general.manualFields.Unit}</Title1>
            <Title2>{general.manualFields.TCKT}</Title2>
          </Col>
          <Col width={1.3 / 10} marginTop={"19px"}>
            <Icon.Warehouse />
          </Col>
          <Col width={1 / 10}>
            <Title1>{general.manualFields.Warehouse}</Title1>
            <Title2>0001</Title2>
          </Col>
        </Row>
        <Row width={"150%"} marginLeft={"-50px"}>
          <ManualFields
            height={"150px"}
            fieldName={general.manualFields.comment}
            placeHolder={general.manualFields.leave}
          ></ManualFields>
        </Row>
        <Col height={"10px"} marginLeft={"-640px"} marginTop={"100px"}>
          <StyledButton height={"40px"} width={"150px"}>
            {general.manualFields.save}{" "}
          </StyledButton>
        </Col>
      </Col>
    </Row>
  );
};

export default ManualTransportation;
