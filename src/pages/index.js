import React, { useState } from "react"
import styled from "@emotion/styled"
import { Col } from "boostly-ui2"
import axios from "axios"

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
`
const Button = styled.div`
  border-radius: 12px;
  border: solid 1px black;
  padding: 20px 12px;
  /* box-shadow: 0px 12px 20px 20px hsla(0, 0%, 0%, 0%, 50%); */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  &:hover {
    background: lightgray;
  }
`
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
const subscribeURL = `http://localhost:9000/subscribe`
const Index = () => {
  const [phone, setPhone] = useState("")
  const handleClick = async day => {
    let prevMonday = new Date()
    if (prevMonday.getDay() !== 1) {
      prevMonday.setDate(prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7))
    }
    prevMonday.setDate(prevMonday.getDate() + day)

    console.log(prevMonday)
    try {
      await axios.post(subscribeURL, {
        phone: phone,
        days: [prevMonday],
      })
      console.log("successful!")
    } catch (e) {}
  }
  return (
    <Container>
      <Col space="evenly">
        <input
          onChange={e => {
            setPhone(e.target.value)
          }}
          name="phone"
          type="text"
          placeholder="Your number"
        />
        {days.map((day, i) => (
          <Button onClick={() => handleClick(i)}>{day}</Button>
        ))}
      </Col>
    </Container>
  )
}

export default Index
