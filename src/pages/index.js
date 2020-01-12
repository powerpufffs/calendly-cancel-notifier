import React from "react"
import styled from "@emotion/styled"
import { Col } from "boostly-ui2"

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
const index = () => {
  return (
    <Container>
      <Col space="evenly">
        {days.map(el => (
          <Button>{el}</Button>
        ))}
      </Col>
    </Container>
  )
}

export default index
