/**@jsx jsx*/
import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"
import { css, jsx } from "@emotion/core"
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
// const Button = styled.div`
//   border-radius: 12px;
//   align-self: stretch;
//   /* border: solid 1px black; */
//   padding: 20px 12px;
//   box-shadow: 0 8px 24px hsla(0, 0%, 0%, 0.2), 0 5px 6px hsla(0, 0%, 0%, 0.1);
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   transition: 0.5s;
//   &:hover {
//     transform: translateY(-5px);
//     transform: scale(1.01px);
//     box-shadow: 0 12px 24px hsla(0, 0%, 0%, 0.2),
//       0 8px 15px hsla(0, 0%, 0%, 0.1);
//   }
// `

const Button = styled.div`
  border-top: 1px solid black;
  padding: 12px 8px;
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

const DayToggle = ({ info, index, ...props }) => {
  const [day, offSet] = info
  return (
    <div
      css={css`
        margin-top: 12px;
        align-self: stretch;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background: hsla(46, 95%, 51%, 0.3);
        border-radius: 8px;
        padding: 16px 16px;
        color: hsl(46, 80%, 20%);
        font-size: 20px;
        &:hover {
          background: hsla(46, 95%, 51%, 0.4);
        }
      `}
      {...props}
    >
      <input
        type="checkbox"
        id={day}
        name={`checkbox`}
        value={offSet}
        // css={css`
        //   position: absolute;
        //   top: -100%;
        // `}
      />
      <label
        css={css`
          margin-left: 6px;
        `}
        htmlFor={day}
      >
        {index === 0 ? `${day} (today)` : day}
      </label>
    </div>
  )
}
const subscribeURL = `${ServerURL}/subscribe`

const Index = () => {
  const [phone, setPhone] = useState("")
  const [dates, setDates] = useState([])
  useEffect(() => {
    let today = new Date()
    const start = today.getDay() - 1
    let dayDiff = 0
    setDates(
      Array(6)
        .fill()
        .map((e, i) => {
          const day = days[(i + start) % days.length]
          const ans = [day, dayDiff]
          dayDiff += day === "Saturday" ? 2 : 1
          return ans
        })
    )
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    const { phone, checkbox } = e.target.elements
    let subbedDays = []
    checkbox.forEach(e => {
      if (e.checked) {
        let date = new Date()
        date.setDate(date.getDate() + +e.value)
        subbedDays.push(date)
      }
    })

    axios
      .post(subscribeURL, {
        phone: phone.value.replace(/\D/g, ""),
        days: subbedDays,
      })
      .then(() => {
        window.alert("Subscribed!")
      })
      .catch(e => {
        window.alert("Subscribed!")
      })
  }

  const handleChange = e => {
    let value = e.target.value.replace(/\D/g, "")
    value.length < 11 && setPhone(value)
    e.target.value = formatter(value)
  }
  const formatter = text => {
    let x = text.match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
    return !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "")
  }
  const generateDays = () => {
    let i = 0
    return dates.map(day => {
      const element = <DayToggle info={day} key={i} index={i} />
      i += day === "Saturday" ? 2 : 1
      return element
    })
  }
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Col
          x
          css={css`
            width: 100%;
            max-width: 450px;
            padding: 0px 12px;
            box-sizing: border-box;
            text-align: center;
          `}
        >
          <Logo
            css={css`
              margin-top: 20px;
            `}
            src="https://instagram.faus1-1.fna.fbcdn.net/v/t51.2885-19/s150x150/66823378_755040478284572_2772656175617933312_n.jpg?_nc_ht=instagram.faus1-1.fna.fbcdn.net&_nc_ohc=XM4Y2WXIbUYAX_5b5PI&oh=1e742897b6756caa3d7bfa2c553a69ea&oe=5ED32C6B"
          />
          <Input
            onChange={handleChange}
            name="phone"
            type="text"
            placeholder="(801) 111 - 1111"
            name="phone"
            required
            css={css`
              margin-top: 20px;
            `}
          />
          <h2
            css={css`
              margin: 0;
              margin-top: 12px;
            `}
          >
            Choose which days you want to be notified for.
          </h2>
          <h3
            css={css`
              margin: 0;
              margin-top: 12px;
              color: tomato;
            `}
          >
            You'll only receive a text if someone cancels an appointment for that
            day.
          </h3>
          {generateDays()}
          <button
            css={css`
              margin-top: 12px;
              padding: 12px 20px;
              border-radius: 8px;
              background: black;
              color: hsl(45, 94%, 51%);
              font-size: 20px;
              &:hover {
                filter: brightness(130%);
              }
            `}
          >
            Notify me!
          </button>
        </Col>
      </form>
    </Container>
  )
}

export default Index
