import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { slugify } from './Util';
import {
  Provider,
  Container,
  Flex,
  Panel,
  Row,
  Column,
  Text,
  Label,
  Box,
  Button,
  Input
} from 'rebass';

class References extends Component {
  constructor () {
    super()
    this.state = {
      identifier: '',
      fullName: '',
      fullAddress: '',
      mobileNumber: '',
      localNumber: '',
      totalYears: '',
      yourIdentifier: '',
      yourName: '',
      location: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleResetForm = this.handleResetForm.bind(this)
  }

  makePDF (state) {

    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    let greaterThanOneYear = state.totalYears > 1 ? 'años': 'año'
    let localNumber = state.localNumber ? state.localNumber : ''
    let date = new Date()
    let day = date.getDate() > 1 ? `${date.getDate()} dias` : `${date.getDate()} dia`
    let month = date.toLocaleString('es-ES', {month: 'long'})
    let year = date.getFullYear()

    var docDefinition = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [80, 60, 80, 60 ],
      content: [
        {
          text: 'A quien pueda interesar',
          style: ['fontBold', 'marginBottomMD']
        },
        {
          text: `Quien suscribe ${state.fullName}, titular de la C.I ${state.identifier} domiciliado en ${state.fullAddress.trim()}. Certifico que conozco de vista y trato desde hace ${state.totalYears} ${greaterThanOneYear} a el Sr./a ${state.yourName}, venezolano mayor de edad, portador de la C.I ${state.yourIdentifier}, quien ha demostrado ser una persona honesta, responsable y cumplidora de sus obligaciones.`,
          style: ['justify', 'marginBottomMD']
        },
        {
          text: `Constancia que se solicita a petición de la parte interesada en ${state.location} a los ${day} de ${month} del año ${year}.`,
          style: ['justify', 'marginBottomMD']
        },
        {
          text: `${state.fullName}`,
          style: ['textCenter']
        },
        {
          text: `
            C.I ${state.identifier}
            Tel. ${state.mobileNumber}
                 ${localNumber}
            `,
          style: ['textCenter']
        }
      ],
      styles: {
        marginBottomMD: {
          margin: [0, 0, 0, 120]
        },
        fontBold: {
          bold: true
        },
        justify: {
          alignment: 'justify',
          lineHeight: 1.5
        },
        textCenter: {
          alignment: 'center',
          lineHeight: 1.5
        }
      }
    }

    pdfMake.createPdf(docDefinition).download(`referencia-${slugify(state.yourName)}`);

  }

  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleResetForm () {
    this.setState({
      identifier: '',
      mobileNumber: '',
      localNumber: '',
      yourIdentifier: ''
    })
    document.getElementById('form').reset()
  }

  handleSubmit (event) {
    event.preventDefault()
    this.makePDF(this.state)
    this.handleResetForm()
  }

  render() {

    let {
      identifier,
      fullName,
      fullAddress,
      mobileNumber,
      totalYears,
      yourIdentifier,
      yourName,
      location } = this.state

      // oh god why...

      function checkForm () {
        if (identifier === '') {
          return true
        }
        if (fullName === '') {
          return true
        }
        if (fullAddress === '') {
          return true
        }
        if (mobileNumber === '') {
          return true
        }
        if (totalYears === '') {
          return true
        }
        if (yourIdentifier === '') {
          return true
        }
        if (yourName === '') {
          return true
        }
        if (location === '') {
          return true
        }
        return false
      }

    return (
      <Provider>
        <Container>
          <Row>
            <Column>
              <Text mt={3} textAlign='center' fontWeight='bold' children='Referencia personal'></Text>
            </Column>
          </Row>
          <form onSubmit={this.handleSubmit} id='form'>
            <Row>
              <Column>
                <Panel>
                  <Panel.Header color='white' bg='blue'>Datos</Panel.Header>
                  <Flex flexWrap='wrap'>
                    <Box width={[1, 1/2]} p={3}>
                      <Label htmlFor='identifier'>Cédula</Label>
                      <NumberFormat
                        id='identifier'
                        name='identifier'
                        value={this.state.identifier}
                        autoFocus
                        required
                        onChange={this.handleChange}
                        customInput={Input} type={'tel'}
                        thousandSeparator
                        prefix={'V-'}
                        placeholder="###########"
                        allowNegative={false}	/>
                    </Box>
                    <Box width={[1, 1/2]} p={3}>
                      <Label htmlFor='fullName'>Nombre completo</Label>
                      <Input
                        id='fullName'
                        name='fullName'
                        required
                        onChange={this.handleChange}
                        placeholder='ej. Hector Juan Perez Martinez'></Input>
                    </Box>
                    <Box width={[1, 1/2]} p={3}>
                      <Label htmlFor='fullAddress'>Dirección completa</Label>
                      <Input
                        id='fullAddress'
                        name='fullAddress'
                        required
                        onChange={this.handleChange}
                        placeholder='ej. Avenida X, Calle Y Número 7'></Input>
                    </Box>
                    <Box width={[1, 1/2]} p={3}>
                      <Label htmlFor='mobileNumber'>Número celular</Label>
                      <NumberFormat
                        id='mobileNumber'
                        name='mobileNumber'
                        value={this.state.mobileNumber}
                        required
                        onChange={this.handleChange}
                        customInput={Input}
                        format="(####) ### ####"
                        placeholder="(####) ### ####" />
                    </Box>
                    <Box width={[1, 1/2]} p={3}>
                      <Label htmlFor='localNumber'>Número local</Label>
                      <NumberFormat
                        id='localNumber'
                        name='localNumber'
                        value={this.state.localNumber}
                        onChange={this.handleChange}
                        customInput={Input}
                        format="(####) ### ####"
                        placeholder="(####) ### ####" />
                    </Box>
                    <Box width={[1, 1/2]} p={3}>
                      <Label htmlFor='totalYears'>Años conociendose</Label>
                      <Input
                        id='totalYears'
                        name='totalYears'
                        required
                        onChange={this.handleChange}
                        placeholder='ej. 7'
                        type='number'
                        min={1}></Input>
                    </Box>
                  </Flex>
                </Panel>
              </Column>
            </Row>
            <Row>
              <Column>
                <Panel>
                  <Panel.Header
                    color='white'
                    bg='blue'>
                    Tus datos
                  </Panel.Header>
                  <Flex flexWrap='wrap'>
                    <Box width={[1, 1/2]} p={3}>
                      <Label htmlFor='yourIdentifier'>Cédula</Label>
                      <NumberFormat
                        id='yourIdentifier'
                        name='yourIdentifier'
                        value={this.state.yourIdentifier}
                        onChange={this.handleChange}
                        customInput={Input}
                        type={'tel'}
                        required
                        thousandSeparator
                        prefix={'V-'}
                        placeholder="###########"
                        allowNegative={false} />
                    </Box>
                    <Box width={[1, 1/2]} p={3}>
                      <Label htmlFor='yourName'>Nombre completo</Label>
                      <Input
                        id='yourName'
                        name='yourName'
                        required
                        onChange={this.handleChange}
                        placeholder='ej. José Antonio Torresola Ruiz'></Input>
                    </Box>
                  </Flex>
                </Panel>
              </Column>
            </Row>
            <Row>
              <Column>
                <Panel>
                  <Panel.Header
                    color='white'
                    bg='blue'>
                    Más
                  </Panel.Header>
                  <Box p={3}>
                    <Label htmlFor='location'>Ubicación</Label>
                    <Input
                      id='location'
                      name='location'
                      required
                      onChange={this.handleChange}
                      placeholder='ej. Avenida X, Calle Y Número 7'></Input>
                  </Box>
                </Panel>
              </Column>
            </Row>
            <Row>
              <Column>
                <Button disabled={checkForm()} children='Generar' />
              </Column>
            </Row>
          </form>
        </Container>
      </Provider>
    );
  }
}

export default References;
