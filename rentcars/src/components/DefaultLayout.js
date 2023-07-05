import React from 'react';
import { Button, Col, Dropdown, Row, Space } from 'antd';

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('user'));
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };
  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Bookings
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          Profile
        </a>
      ),
    },
    {
      key: '3',
      label: <a onClick={handleLogout}>LogOut</a>,
    },
  ];

  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify >
          <Col lg={20} sm={24} xs={24}>

          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <h1>EasyCars</h1>
          <div style={{ padding: '10px' }}>
            <a href="/login" style={{ textDecoration: 'none' }}>
              Login
            </a>{' '}
            /{' '}
            <a href="/register" style={{ textDecoration: 'none' }}>
              Sign Up
            </a>
            <Space direction="vertical">
              <Space wrap>
                <Dropdown menu={{ items }} placement="bottom">
                  <div>
                    {user && <Button>{user.username}</Button>}
                  </div>
                </Dropdown>
              </Space>
            </Space>
          </div>
        </div>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
}

export default DefaultLayout;
