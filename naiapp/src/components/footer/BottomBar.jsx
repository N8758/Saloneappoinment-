import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import linkedIn from '../../assets/linkedin.png'
import instagram from '../../assets/instagram.png'
import twitter from '../../assets/twitter.png'

import {Link} from 'react-router-dom'


const BottomBar = () => {
    const iconStyle={
        imageheight:"3em",
        width:"3em",
    }
  return (
    // <div style={{backgroundColor:"#dee0d2"}}>
    <div style={{backgroundColor:"black" ,color:"white"}}>
        <Container className='para1 mt-2'>
       <Row row-md-4>
        <Col xs={6} md={4}>
          <h3>Useful Links</h3>
          <Nav.Link className='nav-item'><Link to='/' style={{ color: 'white', textDecoration: 'none' }}>Home</Link></Nav.Link>
          <Nav.Link className='nav-item' ><Link to='/about' style={{ color: 'white', textDecoration: 'none' }}>About Us</Link></Nav.Link>
          <Nav.Link className='nav-item' ><Link to='/contact' style={{ color: 'white', textDecoration: 'none' }}>Contact Us</Link></Nav.Link>
          <Nav.Link className='nav-item' ><Link to='/web-services' style={{ color: 'white', textDecoration: 'none' }}>Services</Link></Nav.Link>

          <Nav.Link className='nav-item'  ><Link to='internships' style={{ color: 'white', textDecoration: 'none' }}>Internships</Link></Nav.Link>
        </Col>
        <Col xs={6} md={4}>
            <h3>Legal Links</h3>
          <Nav.Link className='b-nav-item' href="#home">Privacy Policy</Nav.Link>
          <Nav.Link className='b-nav-item' href="#aboutus">Refund Policy</Nav.Link>
          <Nav.Link className='b-nav-item' href="#home">Terms and Conditions</Nav.Link>
        </Col>
        <Col xs={6} md={4}>
            <h3>Contact Info</h3>
            <p>TERMINATORS, Amrutvahini College Of Engineering, Sangamner </p>
          <Nav.Link className='b-nav-item' href="#email"><b style={{fontSize:"20px"}}>contact@Terminators.in</b></Nav.Link>
        </Col>
      </Row>

      <Container className='socialMedia'>
            <h2>Follow Us</h2>
            <Row className="justify-content-center mb-2 mt-3" >
                <Col xs={6} md={1}>
                    <Nav.Link className='i-nav-item' style={{borderRadius:"100px"}} target='blank' href="#linkedIn"><img style={iconStyle} src={linkedIn} alt="LinkedIn" /></Nav.Link>
                </Col>
                <Col xs={6} md={1}>
                    <Nav.Link className='i-nav-item' target='blank' href="https://www.instagram.com/"><img style={iconStyle} src={instagram} alt="Instagram" /></Nav.Link>
                </Col>
                <Col xs={6} md={1}>
                    <Nav.Link className='i-nav-item' target='blank' href="#twitter"><img style={iconStyle} src={twitter} alt="Twitter" /></Nav.Link>
                </Col>
            </Row>
            <p align="center">Copyright ©2024 <b>TERMINATORS</b>. All Rights Reserved Designed By Team <b>TERMINATORS</b></p>
      </Container>
      
    </Container>
    </div>
    
  )
}

export default BottomBar