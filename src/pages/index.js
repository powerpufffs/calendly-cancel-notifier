/**@jsx jsx*/
import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"
import { css, jsx} from "@emotion/core"
import { Col } from "boostly-ui2"
import axios from "axios"
import { ServerURL } from "../utils/urls"

const Container = styled.div`
  min-height: 100vh;
  max-width: 100%;
  display: flex;
  justify-content: center;
  font-family: sans-serif;
`
const Button = styled.div`
  border-radius: 12px;
  align-self: stretch;
  /* border: solid 1px black; */
  padding: 20px 12px;
  box-shadow: 0 8px 24px hsla(0, 0%, 0%, 0.2), 0 5px 6px hsla(0, 0%, 0%, 0.1);
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: 0.5s;
  &:hover {
    transform: translateY(-5px);
    transform: scale(1.01px);
    box-shadow: 0 12px 24px hsla(0, 0%, 0%, 0.2),
      0 8px 15px hsla(0, 0%, 0%, 0.1);
  }
`
const Input = styled.input`
  text-align: center;
  font-size: 24px;
  outline: 0;
  border-width: 0 0 2px;
  border-color: rebeccapurple;
`
const Logo = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 100%;
`
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
const subscribeURL = `${ServerURL}/subscribe`
const Index = () => {
  const [phone, setPhone] = useState("")
  const handleClick = async day => {
    let prevMonday = new Date()
    if (prevMonday.getDay() !== 1) {
      prevMonday.setDate(prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7))
    }
    prevMonday.setDate(prevMonday.getDate() + day)

    try {
      await axios.post(subscribeURL, {
        phone: phone.normal,
        days: [prevMonday],
      })
      window.alert("Subscribed!")
    } catch (e) {}
  }
  useEffect(() => {
    console.log(phone)
  }, [phone])

  const handleChange = e => {
    let value = e.target.value.replace(/\D/g, "")
    value.length < 11 && setPhone(value)
    e.target.value = formatter(value)
  }
  const formatter = text => {
    let x = text.match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
    return !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "")
  }
  return (
    <Container>
      <Col
        x
        space="evenly"
        css={css`
          width: 90%;
          max-width: 450px;
        `}
      >
        <Logo src="https://instagram.faus1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/66823378_755040478284572_2772656175617933312_n.jpg?_nc_ht=instagram.faus1-1.fna.fbcdn.net&_nc_ohc=XM4Y2WXIbUYAX_5b5PI&oh=1e742897b6756caa3d7bfa2c553a69ea&oe=5ED32C6B" />
        <Input
          onChange={handleChange}
          name="phone"
          type="text"
          placeholder="(XXX) XXX - XXXX"
        />
        {days.map((day, i) => (
          <Button key={day.key} onClick={() => handleClick(i)}>
            {day}
          </Button>
        ))}
      </Col>
    </Container>
  )
}

export default Index
