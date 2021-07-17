import React from 'react';
import Styles from './Dashboard.module.scss';
import Container from  'react-bootstrap/Container';
import Row from  'react-bootstrap/Row';

var Dashboard = () => {
  return (
    <Container>
      <Row>
        <div className={Styles.Heading}>Hello World</div>
      </Row>
    </Container>
  )
}

export default Dashboard;