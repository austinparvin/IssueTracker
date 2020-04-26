import React from 'react'
import { Button, ButtonGroup } from 'reactstrap'

const ImportanceButtons = ({ setRSelected, rSelected }) => {
  return (
    <section className="importance">
      <h5>Importance</h5>
      <ButtonGroup>
        <Button
          className="low importance-button"
          onClick={() => setRSelected(1)}
          active={rSelected === 1}
        >
          Low
        </Button>
        <Button
          className="medium importance-button"
          onClick={() => setRSelected(2)}
          active={rSelected === 2}
        >
          Medium
        </Button>
        <Button
          className="high importance-button"
          onClick={() => setRSelected(3)}
          active={rSelected === 3}
        >
          High
        </Button>
      </ButtonGroup>
    </section>
  )
}

export default ImportanceButtons
